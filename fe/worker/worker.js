importScripts("fib.js");

self.addEventListener("message", (event) => {
    let num = event.data;
    let res = fib(num);
    console.log(res);
    self.postMessage(res);
});