import { PatternService } from "./pattern.service";
import { TagDocument } from "../interface";
import { Tag } from "../model";

export const TagService = new PatternService<TagDocument>(Tag)
