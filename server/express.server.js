var path = require('path')
var fs = require('fs')
var express = require('express')
var https = require('https')
console.log(path.resolve('./ssl/server.key')+'')
var certOptions = {
  key: fs.readFileSync(path.resolve('server/ssl/server.key')),
  cert: fs.readFileSync(path.resolve('server/ssl/server.crt'))
}

var app = express()

var server = https.createServer(certOptions, app).listen(6666)