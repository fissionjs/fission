express = require 'express'
http = require 'http'
{join} = require 'path'

PORT = Number process.env.PORT or 8080

app = express()
app.use express.static join __dirname, 'public'

app.use (err, req, res, next) ->
  console.error err.stack
  res.send 500, 'Something broke!'

# Serve spa
app.get '/*', (req, res) ->
  idxFile = join __dirname, 'public/index.html'
  res.status 200
    .sendFile idxFile

httpServer = http.createServer app

httpServer.listen PORT, ->
  console.log 'info', "Server running on #{PORT}"
