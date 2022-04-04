"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyCategorySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
var yup_1 = require("yup");
var payload = {
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required('Category name is require!'),
        status: (0, yup_1.string)().required('Category status is require!')
    })
};
exports.createCategorySchema = (0, yup_1.object)(__assign({}, payload));
exports.updateCategorySchema = (0, yup_1.object)(__assign({ params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    }) }, payload));
exports.destroyCategorySchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    })
});
