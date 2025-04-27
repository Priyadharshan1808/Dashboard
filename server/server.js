// server/server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./dashboardData.json'); // path to the data file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
