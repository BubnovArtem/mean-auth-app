import "jasmine";
const assert = require('assert');
const request = require('supertest');
const express: any = require('express');
const path: any = require('path');
const bodyParser: any = require('body-parser');
const cors: any = require('cors');
const passport: any = require('passport');
const mongoose: any = require('mongoose');
const config = require('../../config/database');
const users = require('../../routes/users');
const tasks = require('../../routes/tasks');
const chat = require('../../routes/chat');

describe("Check all dependencies", () => {

    it("Should load Express", () => {
        expect(express).not.toBe(null);
    });
    it("Should load Path", () => {
        expect(path).not.toBe(null);
    });
    it("Should load BodyParser", () => {
        expect(bodyParser).not.toBe(null);
    });
    it("Should load Cors", () => {
        expect(cors).not.toBe(null);
    });
    it("Should load Passport", () => {
        expect(passport).not.toBe(null);
    });
    it("Should load Mongoose", () => {
        expect(mongoose).not.toBe(null);
    });
    it("Should load DB Config", () => {
        expect(config).not.toBe(null);
    });
    it("Should load Users", () => {
        expect(users).not.toBe(null);
    });
    it("Should load DB Tasks", () => {
        expect(tasks).not.toBe(null);
    });
    it("Should load DB Chat", () => {
        expect(chat).not.toBe(null);
    });

});

describe("Database connection", () => {
    
    it("Mongoose Promise should be Global Promise", () => {
        let promise = mongoose.Promise = global.Promise;
        expect(promise).not.toBe(null);
        expect(promise).toEqual(global.Promise);
    });
    it("Should connect to mongoDB", (done) => {
        mongoose.Promise = global.Promise;
        let conn = mongoose.connect(config.database, {
            useMongoClient: true
        });
        assert.equal(conn.constructor.name, 'NativeConnection');

        conn.then((conn) => {
            assert.equal(conn.constructor.name, 'NativeConnection');
            assert.equal(conn.host, 'localhost');
            assert.equal(conn.port, 27017);
            assert.equal(conn.name, 'mongoosetest');
    
            return mongoose.disconnect()
                .then(() => { 
                    done(); 
                });

        }).catch(done);
    });

    describe('App', () => {
        it('should inherit from event emitter', (done) => {
          let app = express();
          app.on('foo', done);
          app.emit('foo');
        })
      
        it('should be callable', () => {
          let app = express();
          assert.equal(typeof app, 'function');
        })
      
        it('should 404 without routes', (done) => {
          request(express())
          .get('/')
          .expect(404, done);
        })
    });

    describe('app.router', () => {
        it('should throw with notice', (done) => {
          let app = express();
      
          try {
            app.router;
          } catch(err) {
            done();
          }
        })
    });

    describe('in development', () => {
        it('should disable "view cache"', () => {
            process.env.NODE_ENV = 'development';
            let app = express();
            expect(app.enabled('view cache')).toBeFalsy();
            process.env.NODE_ENV = 'test';
        })
    });
    
    describe('in production', () => {
        it('should enable "view cache"', () => {
            process.env.NODE_ENV = 'production';
            let app = express();
            expect(app.enabled('view cache')).toBeTruthy();
            process.env.NODE_ENV = 'test';
        })
    });
    
    describe('without NODE_ENV', () => {
        it('should default to development', () => {
            process.env.NODE_ENV = '';
            let app = express();
            expect(app.get('env')).toMatch('development');
            process.env.NODE_ENV = 'test';
        })
    });

    describe('app.listen()', () => {
        it('should wrap with an HTTP server', (done) => {
          let app = express();
      
          app.delete('/tobi', function(req, res){
            res.end('deleted tobi!');
          });
      
          let server = app.listen(9999, () => {
            server.close();
            done();
          });
        })
    });

    describe('.request', () => {
        it('should extend the request prototype', (done) => {
          let app = express();
    
          app.request.querystring = () => {
            return require('url').parse(this.url).query;
          };
    
          app.use((req, res) => {
            res.end(req.querystring());
          });
    
          request(app)
          .get('/foo?name=tobi')
          .expect('name=tobi', done);
        })
    })

});