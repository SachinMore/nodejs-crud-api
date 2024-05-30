const express = require("express");

const server = express();

server.use(express.json());

//Query params = ?teste=1
//routes params = /users/1

//CRUD - Create, Read, Update, Delete

const users = ["Sachin", "Sai", "Amit", "Sandeepan"];
//applying middleware global
server.use((req, res, next) => {
  console.time(`Request`);
  console.log(`Metodo: ${req.method}; URL: ${req.url}; `);

  next();

  console.timeEnd(`Request`);
});
//checks if the username exists
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}
//checks if the user exists in the array
function checkUserinArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}


// Routes------------------------
//returns all users
server.get("/users", (req, res) => {
  return res.json(users);
});
//returns a users
server.get("/users/:index", checkUserinArray, (req, res) => {
  return res.json(req.user);
});
//create a user
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});
//change a user
server.put("/users/:index", checkUserinArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});
//delete a user
server.delete("/users/:index", checkUserinArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});
server.listen(3000);
console.log('Server has started on port 3000');
console.log('To list users, hit this URL: http://localhost:3000/users');