import http from "http";
// import socketIO from "socket.io";
const socketIO = require("socket.io");
export default function () {
  this.nuxt.hook("render:before", (renderer: any) => {
    const server = http.createServer(this.nuxt.renderer.app);
    const io = socketIO(server);

    // overwrite nuxt.server.listen()
    this.nuxt.server.listen = (port: any, host: any) =>
      new Promise((resolve: any) =>
        server.listen(port || 3000, host || "localhost", resolve)
      );
    // close this server on 'close' event
    this.nuxt.hook("close", () => new Promise(server.close));

    // Add socket.io events
    const messages = [];
    io.on(
      "connection",
      (socket: {
        on: (
          arg0: string,
          arg1: { (fn: any): void; (message: any): void }
        ) => void;
        broadcast: { emit: (arg0: string, arg1: any) => void };
      }) => {
        socket.on("last-messages", function (fn: (arg0: any[]) => void) {
          fn(messages.slice(-50));
        });
        socket.on("send-message", function (message: any) {
          messages.push(message);
          socket.broadcast.emit("new-message", message);
        });
      }
    );
  });
}
