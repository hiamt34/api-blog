import { Request, Response } from 'express';
import { DocumentDefinition } from 'mongoose';
import log from '../../logger';
import { InstagramDocument } from '../interface';
import { instagramService } from '../service';
import { PatternController } from './pattern.controller';

class InstagramController<T extends { url: string }> extends PatternController<T> {
    public store = async (req: Request, res: Response) => {
        try {
            const urlImg: string | null = req.file?.path || null

            if (!urlImg) {
                throw new Error('is not image')
            }

            const instagram = {
                url: urlImg 
            } as DocumentDefinition<T>

            const data = await this.service.create(instagram)

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

export const instagramController = new InstagramController<InstagramDocument>(instagramService)
