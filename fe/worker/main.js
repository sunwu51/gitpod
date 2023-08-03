console.time("test");
let count = 0;
for (var i = 0; i < 10; i++) {
    let worker = new Worker('worker.js');
    worker.postMessage(40);
    worker.addEventListener("message", (event) => {
        count++;
        if (count == 10) {
            console.timeEnd("test");
        }
        worker.terminate();
    })
}