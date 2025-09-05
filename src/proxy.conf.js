const fs = require('fs');

const proxy = [
  {
    context: ['/smart-api'],
    target: 'http://localhost:8080/smart/clientes/v1.0',
    pathRewrite: {'^/smart-api' : ''},
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    rejectUnhauthorized : false
  },
  {
    context: ['/portal-acessos'],
    target: 'http://localhost:8081/portal/acessos-usuarios/v1.0',
    pathRewrite: {'^/portal-acessos' : ''},
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    rejectUnhauthorized : false
  },
  {
    context: ['/portal-menus'],
    target: 'http://localhost:8082/portal/menus-sistemas/v1.0',
    pathRewrite: {'^/portal-menus' : ''},
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    rejectUnhauthorized : false
  },
  {
    context: ['/rh-vinculos'],
    target: 'http://localhost:8083/rh/vinculos/v1.0',
    pathRewrite: {'^/rh-vinculos' : ''},
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    rejectUnhauthorized : false
  }
];
module.exports = proxy;
