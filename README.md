# Network Server

## Starting server

To start the server enter the command `$env:DEBUG='network-server:*'; npm start`.
More information at [Express Getting Started](https://expressjs.com/en/starter/installing.html)

Then to start the mqtt client enter the command `node ../SIN-Greenhouse-security-dashboard/public/javascripts/mqtt-client.js`.

## Making changes

The best way to interact with this project is to open all folders except node_modules.

To create a new page to request information from, you need to create a new Javascript file in the folder routes. Then add the necessary links in app.js.

## Working with jade

[Jade Syntax Docs](https://naltatis.github.io/jade-syntax-docs/)
