'use strict';
const server = require('net').createServer(connection => {
    console.log('Subscribe connected');

    //two boundary messages
    const firstChunk = '{"type": "changed", "timestamp": 1450694370094}\n{"type": "changed", "timestamp": 1450694370194}\n{"type": "changed", "timesta';
    const secondChunk = 'mp": 1450694370294}\n';

    connection.write(firstChunk);
    const timer = setTimeout(() => {
        connection.write(secondChunk);
        connection.end();
    }, 100);

    connection.on('end', ()=>{
        clearTimeout(timer);
        console.log('Subscriber discounnected.');
    });
});

server.listen(60300, function(){
    console.log('Test server listening for subscribers...')
})
