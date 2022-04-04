"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
var pattern_service_1 = require("./pattern.service");
var model_1 = require("../model");
exports.TagService = new pattern_service_1.PatternService(model_1.Tag);
