import { Request, Response } from 'express';
import log from '../../logger';
import { PostDocument } from '../interface';
import { postService } from '../service';
import { PatternController } from './pattern.controller';
export interface IQuery {
    title: string;
    tags: string;
    category: string;
    status: 'hot' | 'normal'
}
export interface IConfig {
    limit: number;
    page: number
}
class PostController<T> extends PatternController<T> {
    public index = async (req: Request, res: Response) => {
        try {

            const query = req.query
            
            const config = {
                limit: Number(query.limit) || 10,
                page: Number(query.page) || 1
            } as IConfig

            const filter = {
                title: query.title || null,
                tags: query.tags || null,
                category: query.category || null,
                status: query.status || null
            } as IQuery

            const data = await postService.getAllAndPaginate(config, filter);

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
    }

    public uploadCKEditor = async (req: Request, res: Response) => {
        try {
            const urlImg: string | null = req.file?.path || null

            if (!urlImg) {
                throw new Error('is not image')
            }

            return res.status(200).json({
                uploaded: true,
                url: 'http://localhost:1998/' + urlImg
            });
        } catch (error: any) {
            log.error(error.message);
            return res.status(409).json({
                status: false,
                mes: error.message
            });
        }
    }

    public uploadDropzone = async (req: Request, res: Response) => {
        try {
            const urlImg: string | null = req.file?.path || null

            if (!urlImg) {
                throw new Error('is not image')
            }
            const data = {
                url: urlImg
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

    
}

export const postController = new PostController<PostDocument>(postService)