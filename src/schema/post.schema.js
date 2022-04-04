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
exports.destroyPostSchema = exports.changeStatusPostSchema = exports.activePostSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
var yup_1 = require("yup");
var payload = {
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().required('Post name is require!'),
        description: (0, yup_1.string)().required('Post description is require!'),
        tags: (0, yup_1.array)().required('Tags is require!'),
        category: (0, yup_1.string)().required('Post category is require!'),
        imgs: (0, yup_1.array)().required('images is require!'),
        video: (0, yup_1.string)(),
    })
};
exports.createPostSchema = (0, yup_1.object)(__assign({}, payload));
exports.updatePostSchema = (0, yup_1.object)(__assign({ params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    }) }, payload));
exports.activePostSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    }),
    body: (0, yup_1.object)({
        active: (0, yup_1.boolean)().required('active is require')
    })
});
exports.changeStatusPostSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    }),
    body: (0, yup_1.object)({
        status: (0, yup_1.string)().required('status is require')
    })
});
exports.destroyPostSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    })
});
