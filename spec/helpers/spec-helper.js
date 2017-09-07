"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var log4js = require("log4js");
beforeEach(function () {
    log4js.configure({
        appenders: {
            out: { type: 'stdout' },
            app: { type: 'file', filename: 'logs/test.log' }
        },
        categories: {
            default: {
                appenders: ['out', 'app'],
                level: 'debug'
            }
        }
    });
});
//# sourceMappingURL=spec-helper.js.map