import "jasmine";
import * as log4js from "log4js";

beforeEach(() => {
    log4js.configure({
        appenders: {
            out: { type: 'stdout'},
            app: { type: 'file', filename: 'logs/test.log'}
        }, 
        categories: {
            default: {
                appenders: ['out', 'app'],
                level: 'debug'
            }
        }
    });
});