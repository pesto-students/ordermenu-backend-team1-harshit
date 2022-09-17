const { Server } = require('socket.io')
let io;

module.exports = {
  init: (server) => {
    io = new Server();
    io.attach(server, { cors: { origin: '*' } })

    io.on('connection', (socket) => {
      socket.on("join_channel", (room) => {
        socket.join(room);
      });
    });
  },
  newOrder: (room, order) => {
    io.to(room).emit("new_order", { order })
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  }
};
