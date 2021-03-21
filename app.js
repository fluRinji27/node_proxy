const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxy()

const options = {
  'flurinji.ru': 'http://localhost:3000',
  'mehanic.flurinji.ru': 'http://localhost:3001'
}
require('http').createServer(function (req, res) {
  proxy.web(req, res, {
    target: options[req.headers.host]
  })
  proxy.on('error', function (err, req, res) {
    console.log('ERROR proxy server', err)
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    })
  })
}).listen(80)