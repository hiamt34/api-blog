import { TagDocument } from '../interface';
import { TagService } from '../service';
import { PatternController } from './pattern.controller';

export const TagController = new PatternController<TagDocument>(TagService)
