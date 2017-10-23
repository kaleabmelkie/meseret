# meseret

configuration-based backbone for node.js servers.  

## Features

##### General:
- TypeScript everywhere.
- Configuration-based architecture (using TypeScript code).

##### Server:
- Koa server with preconfigured compression, static caching, body parsing (including JSON) and console logging.
- Support for more Koa middleware, and koa-router routes.
- Listening on multiple HTTP and/or HTTPS servers.
- Static-serving (hosting) multiple public directories.

##### Database:
- MongoDB connection and Mongoose models.
- A `ModelFactory` for type enabled Mongoose schema paths, methods and statics, -- bringing autocomplete to the data model.

##### WebSocket:
- Socket.io support.

## Installation
Using Yarn:
```bash
yarn add meseret
```  

Or, using NPM:
```bash
npm install meseret --save
```  

## Usage

Meseret is written in TypeScript, so the code you write is also expected to be in TypeScript.  

A simple server app listening for requests using Koa at `http://localhost:80/` and `http://127.0.0.1:3000/` may look like:
```typescript
import { ServerApp } from 'meseret'

new ServerApp({
  name: 'Simple Demo App',
  
  httpServers: [
    { path: 'localhost', port: 80 },
    { path: '127.0.0.1', port: 3000 }
  ]
}).start()
  .then(() => console.log(`'Simple Demo App' is starting...`))
  .catch(err => console.error(`Problem starting app: ${err}`))
```  

Note: The `name` is required; but every other configuartion field is optional.  

Now, a simple server app that connects to MongoDB (at `mongodb://localhost:27017/db-name`) may look like:
```typescript
import { ServerApp } from 'meseret'

new ServerApp({
  name: 'MongoDB Connect Demo',
  
  mongoUris: 'mongodb://localhost:27017/db-name',
  
  httpServers: [
    { path: 'localhost', port: 80 }
  ]
}).start()
  .then(() => console.log(`'MongoDB Connect Demo' is starting...`))
  .catch(err => console.error(`Problem starting app: ${err}`))
```  

And, a server app that hosts a public directory (assuming a `./public` directory exists):
```typescript
import { ServerApp } from 'meseret'
import { join } from 'path'

new ServerApp({
  name: 'Folder Host Demo',
  
  mongoUris: 'mongodb://localhost:27017/db-name',
  
  publicDirs: [
    join(__dirname, './public/')
  ],
  
  httpServers: [
    { path: 'localhost', port: 80 }
  ]
}).start()
  .then(() => console.log(`'Folder Host Demo' is starting...`))
  .catch(err => console.error(`Problem starting app: ${err}`))
```  

Besides `name`, `mongoUris`, `publicDirs` and `httpServers`, there are many more configuration options that are already in place and working just fine. To name a few: `httpsServers`, Mongoose `models`, `cacheControl` type, Koa-compatible `middleware` and `routes` (as Koa-middleware).  

More documentation and guide is coming soon in future releases (including on how to use the mongoose `ModelFactory` for an IDE auto-complete support of the models in TypeScript).  

## Demo

Meanwhile, the `demo` folder contains a simple end-to-end "Task Organizer" application.  
After launching a `mongod` server (on `mongodb://localhost:27017`), you may try running the demo as:
```bash
yarn start
```
or
```bash
npm start
```
or
```bash
node ./demo/src/main.js
```
Note: This demo requires a browser that supports `fetch()` in order to work properly.  

## Licence
Made with &hearts; in Addis Ababa.  
[MIT License](LICENSE) &copy; 2017 Kaleab S. Melkie.
