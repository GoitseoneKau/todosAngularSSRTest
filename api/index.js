// const server = require('../dist/todo-app/server/server.mjs');

// module.exports = server.app()

export default import('../dist/todo-app/server/server.mjs').then(module=>module.app())