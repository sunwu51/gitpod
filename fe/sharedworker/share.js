importScripts('fib.js')

self.onconnect = (event) => {
    let port = event.ports[0]
    port.onmessage =  (e) => {
        let num = e.data;
        let res = fib(num);
        // console.log(res);
        port.postMessage(res);
    };
}