"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagController = void 0;
var service_1 = require("../service");
var pattern_controller_1 = require("./pattern.controller");
exports.TagController = new pattern_controller_1.PatternController(service_1.TagService);
