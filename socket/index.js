const io = require("socket.io")(4343, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (userId, socketId) => {
  users = users.filter((user) => user.userId !== userId);
};
const getUser = (userId) => {
  if (userId !== null) {
    return users.find((user) => user.userId === userId);
  }
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("server Nhan", senderId, receiverId, text);
    const user = getUser(receiverId);
    console.log(user);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
