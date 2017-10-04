# meseret

configuration-based backbone for node.js servers.  

## Installation

Using NPM:
```bash
npm install meseret --save
```  

Or, using Yarn:
```bash
yarn add meseret
```  

## Usage

Meseret is written in TypeScript (with built-in types support), so the code you write is also expected to be in TypeScript.  

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
  .then(() => { /* success */ })
  .catch((err: any) => { /* problem */ })
```  

The `name` is required; but every other configuartion field is optional.  

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
  .then(() => { /* success */ })
  .catch((err: any) => { /* problem */ })
```  

And, a server app that hosts a public directory (assuming a `./public` directory exists):
```typescript
import { ServerApp } from 'meseret'
import { join } from 'path'

new ServerApp({
  name: 'MongoDB Connect Demo',
  
  mongoUris: 'mongodb://localhost:27017/db-name',
  
  publicDirs: [
    join(__dirname, './public/')
  ],
  
  httpServers: [
    { path: 'localhost', port: 80 }
  ]
}).start()
  .then(() => { /* success */ })
  .catch((err: any) => { /* problem */ })
```  

Besides `name`, `mongoUris`, `publicDirs` and `httpServers`, there are many more configuration options that are already in place and working just fine. To name a few: `httpsServers`, Mongoose `models`, Koa-compatible `middleware` and `routes` (as Koa-middleware).  

More documentation and guide is coming soon in future releases (including on how to use the mongoose `ModelFactory` for an IDE auto-complete support of the models in TypeScript).  

Meanwhile, the `demo` folder contains a simple "Task Organizer" application. Please do see and run the demo:
```bash
npm start
```
or
```bash
yarn start
```
or
```bash
tsc && node ./demo/demo.js
```

## Licence
MIT  
Copyright (c) 2017 Kaleab S. Melkie
