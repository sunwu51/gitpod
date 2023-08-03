console.time("test");
let count = 0;
for (var i = 0; i < 10; i++) {
    let worker = new SharedWorker('share.js');
    worker.port.postMessage(40);
    worker.port.onmessage = (event) => {
        console.log(event.data)
        count++;
        if (count == 10) {
            console.timeEnd("test");
        }
    }
}
