import { Request, Response } from "express";
import { Error } from "mongoose";
import log from "../../logger";
import { instagramService } from "../service";
import fs from "fs";



class UploadController {
    
    public destroyImg = async (req: Request, res: Response) => {
        try {
            const path = req.body.path

            const checkPath = await fs.existsSync(path)
            if (checkPath) { await fs.unlinkSync(path) }

            await instagramService.destroy({
                url: path
            })
            
            return res.status(200).json({
                status: true,
                data: {
                    message: 'success'
                }
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

export const uploadController = new UploadController
