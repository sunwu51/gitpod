const {workerData, parentPort} = require('worker_threads');

function fib(n) {
    return n < 2 ? 1 : fib(n - 1) + fib(n-2);
}

let num = workerData;
let res = fib(num);
console.log(res);
parentPort.postMessage(res);
