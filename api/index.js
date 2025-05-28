// const server = require('../dist/todo-app/server/server.mjs');
// console.log("starting server function")
// module.exports = server.app()
export default import('../dist/todo-app/server/server.mjs').then(module=>module.app())