import { Request, Response } from 'express';
import { omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';
import log from '../../logger';
import { CategoryDocument } from '../interface';
import { Category } from '../model';
import { CategoryService } from '../service';
import { PatternController } from './pattern.controller';

class CategoryControllerV2<T> extends PatternController<T> {

    public index = async (req: Request, res: Response) => {
        try {
            const data = await this.service.getAll();
            return res.status(200).json({
                status: true,
                data
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(409).json({
                status: false,
                mes: error.message
            });
        }
    };

    public store = async (req: Request, res: Response) => {
        try {
            let reqData = req.body;

            reqData = reqData.status === 'ROOT' && omit(reqData, ['status'])

            const data = await this.service.create(reqData);

            return res.status(200).json({
                status: true,
                data
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(409).json({
                status: false,
                mes: error.message
            });
        }
    };

    public indexV2 = async (req: Request, res: Response) => {
        try {
            const data = await CategoryService.getAllMapCountPost();            
            return res.status(200).json({
                status: true,
                data
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(409).json({
                status: false,
                mes: error.message
            });
        }
    };
}

export const CategoryController = new CategoryControllerV2<CategoryDocument>(CategoryService)
