"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var assert = require('assert');
var request = require('supertest');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('../../config/database');
var users = require('../../routes/users');
var tasks = require('../../routes/tasks');
var chat = require('../../routes/chat');
describe("Check all dependencies", function () {
    it("Should load Express", function () {
        expect(express).not.toBe(null);
    });
    it("Should load Path", function () {
        expect(path).not.toBe(null);
    });
    it("Should load BodyParser", function () {
        expect(bodyParser).not.toBe(null);
    });
    it("Should load Cors", function () {
        expect(cors).not.toBe(null);
    });
    it("Should load Passport", function () {
        expect(passport).not.toBe(null);
    });
    it("Should load Mongoose", function () {
        expect(mongoose).not.toBe(null);
    });
    it("Should load DB Config", function () {
        expect(config).not.toBe(null);
    });
    it("Should load Users", function () {
        expect(users).not.toBe(null);
    });
    it("Should load DB Tasks", function () {
        expect(tasks).not.toBe(null);
    });
    it("Should load DB Chat", function () {
        expect(chat).not.toBe(null);
    });
});
describe("Database connection", function () {
    it("Mongoose Promise should be Global Promise", function () {
        var promise = mongoose.Promise = global.Promise;
        expect(promise).not.toBe(null);
        expect(promise).toEqual(global.Promise);
    });
    it("Should connect to mongoDB", function (done) {
        mongoose.Promise = global.Promise;
        var conn = mongoose.connect(config.database, {
            useMongoClient: true
        });
        assert.equal(conn.constructor.name, 'NativeConnection');
        conn.then(function (conn) {
            assert.equal(conn.constructor.name, 'NativeConnection');
            assert.equal(conn.host, 'localhost');
            assert.equal(conn.port, 27017);
            assert.equal(conn.name, 'mongoosetest');
            return mongoose.disconnect()
                .then(function () {
                done();
            });
        }).catch(done);
    });
    describe('App', function () {
        it('should inherit from event emitter', function (done) {
            var app = express();
            app.on('foo', done);
            app.emit('foo');
        });
        it('should be callable', function () {
            var app = express();
            assert.equal(typeof app, 'function');
        });
        it('should 404 without routes', function (done) {
            request(express())
                .get('/')
                .expect(404, done);
        });
    });
    describe('app.router', function () {
        it('should throw with notice', function (done) {
            var app = express();
            try {
                app.router;
            }
            catch (err) {
                done();
            }
        });
    });
    describe('in development', function () {
        it('should disable "view cache"', function () {
            process.env.NODE_ENV = 'development';
            var app = express();
            expect(app.enabled('view cache')).toBeFalsy();
            process.env.NODE_ENV = 'test';
        });
    });
    describe('in production', function () {
        it('should enable "view cache"', function () {
            process.env.NODE_ENV = 'production';
            var app = express();
            expect(app.enabled('view cache')).toBeTruthy();
            process.env.NODE_ENV = 'test';
        });
    });
    describe('without NODE_ENV', function () {
        it('should default to development', function () {
            process.env.NODE_ENV = '';
            var app = express();
            expect(app.get('env')).toMatch('development');
            process.env.NODE_ENV = 'test';
        });
    });
    describe('app.listen()', function () {
        it('should wrap with an HTTP server', function (done) {
            var app = express();
            app.delete('/tobi', function (req, res) {
                res.end('deleted tobi!');
            });
            var server = app.listen(9999, function () {
                server.close();
                done();
            });
        });
    });
    describe('.request', function () {
        it('should extend the request prototype', function (done) {
            var app = express();
            app.request.querystring = function () {
                return require('url').parse(_this.url).query;
            };
            app.use(function (req, res) {
                res.end(req.querystring());
            });
            request(app)
                .get('/foo?name=tobi')
                .expect('name=tobi', done);
        });
    });
});
//# sourceMappingURL=app.spec.js.map