import { PatternService } from "./pattern.service";
import { InstagramDocument } from "../interface";
import { Instagram } from "../model";
import { FilterQuery } from "mongoose";
import fs from "fs";

class InstagramService extends PatternService<InstagramDocument> {
    public destroy = async (query: FilterQuery<InstagramDocument>) => {
        try {
            
            const instagram = await this.model.findOne(query) as InstagramDocument
            if (instagram) {
                const checkPath = await fs.existsSync(instagram.url)
                if (checkPath) { await fs.unlinkSync(instagram.url) }
            }
            
            return this.model.deleteOne(query);
        } catch (error: any) { 
            throw new Error(error);
        }
    };
}

export const instagramService = new InstagramService(Instagram)
