// Vercel serverless function for backend API
const app = require('../backend/dist/index.js').default

module.exports = (req, res) => {
  app(req, res)
}
