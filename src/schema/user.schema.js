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
exports.detailDestroyDeleteUserSchema = exports.loginUserSchema = exports.activeUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
var yup_1 = require("yup");
var payload = {
    body: (0, yup_1.object)({
        // name: string()
        //     .required('Name is require!'),
        password: (0, yup_1.string)()
            .required('password is require!')
            .min(6, 'password should be 6 chars minimum')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'password is latin!'),
        email: (0, yup_1.string)()
            .email('is not email')
            .required('email is require!'),
        // phone: string()
        //     .min(10)
        //     .max(10),
        confirmPassword: (0, yup_1.string)()
            .oneOf([(0, yup_1.ref)('password')], 'password must match!')
    })
};
exports.createUserSchema = (0, yup_1.object)(__assign({}, payload));
exports.updateUserSchema = (0, yup_1.object)(__assign({ params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    }) }, payload));
exports.activeUserSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    }),
    body: (0, yup_1.object)({
        status: (0, yup_1.boolean)()
            .required('status is require!'),
    })
});
exports.loginUserSchema = (0, yup_1.object)(__assign({}, payload));
exports.detailDestroyDeleteUserSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        _id: (0, yup_1.string)()
            .required('_id is require!')
    })
});
