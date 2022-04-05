"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.mailerService = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var config_1 = __importDefault(require("config"));
var logger_1 = __importDefault(require("../../logger"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
var mailerService = function (_a) {
    var emailUser = _a.emailUser, token = _a.token;
    var transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
            user: config_1.default.get('auth.user'),
            pass: config_1.default.get('auth.pass')
        }
    });
    var mailOptions = {
        from: config_1.default.get('auth.user'),
        to: emailUser,
        subject: 'Active account',
        html: "<h1><a href=\"http://" + config_1.default.get('host') + ":" + config_1.default.get('port') + "/auth/signin/" + token + "\">Click to active account</a></h1>"
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            logger_1.default.error(error);
        }
        logger_1.default.info("Email sent " + emailUser + ": " + info.response);
    });
};
exports.mailerService = mailerService;
var createToken = function (dataSignin) {
    return jsonwebtoken_1.default.sign(dataSignin, config_1.default.get('privateKey'));
};
exports.createToken = createToken;
