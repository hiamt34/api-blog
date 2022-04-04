"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyInstagramSchema = exports.activeInstagramSchema = void 0;
var yup_1 = require("yup");
exports.activeInstagramSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    }),
    body: (0, yup_1.object)({
        status: (0, yup_1.boolean)()
            .required('status is require!'),
    })
});
exports.destroyInstagramSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    })
});
