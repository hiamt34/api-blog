import { Request, Response } from 'express';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import log from '../../logger';
import { PatternService } from '../service/pattern.service';

export class PatternController<T> {

    service: PatternService<T>
    constructor(service: PatternService<T>) {
        this.service = service
    };

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

    public show = async (req: Request, res: Response) => {
        try {
            const query = {
                _id: req.params._id as string
            } as unknown as FilterQuery<T>;

            const data = await this.service.getDetail(query);

            if (!data) {
                return res.status(404).json({
                    status: false,
                    message: 'data not found!'
                });
            }

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
            const reqData: DocumentDefinition<T> = req.body;

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

    public update = async (req: Request, res: Response) => {
        try {

            const query = {
                _id: req.params._id as string
            } as unknown as FilterQuery<T>;

            const update = req.body;
            const data = await this.service.update(query, update);

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

    public destroy = async (req: Request, res: Response) => {
        try {
            const query = {
                _id: req.params._id as string
            } as unknown as FilterQuery<T>;

            await this.service.destroy(query);

            return res.status(200).json({
                status: true,
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(409).json({
                status: false,
                mes: error.message
            });
        }
    };
};
