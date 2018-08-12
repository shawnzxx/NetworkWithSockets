'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client');

describe('Test LDJClient', () => {
    let stream = null;
    let client = null;

    beforeEach(() => {
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });

    it('should emit a message event from a single data event', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'});
            setTimeout(()=>{done()}, 1000); //call done callback function after 4.5 seconds, done function is Mocha provided indicate that test has finished
        });
        stream.emit('data', '{"foo":');
        process.nextTick(() => {
            setTimeout(()=>{
                stream.emit('data', '"bar"}\n');  //2nd message send our after 2 seconds
            }, 2000)
        });
    });
});