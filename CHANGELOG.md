# meseret change log

#### v1.8.4

- Add [jest](https://www.npmjs.com/package/jest) support
- Add [cross-env](https://www.npmjs.com/package/cross-env) support
- Include map files and src in the npm shipment for a better debugging experience

#### v1.8.3

- Bug fix: unexpected IServerAppConfig.cacheFiles behaviors (fixed as an in-code patch to the underlying library)

#### v1.8.2

- Stop manual pluralization of mongoose models in ModelFactory (it was causing edge-case problems)
- Timeout for 5 seconds before auto-creating new collections (to give mongoose time to register all models)
- Improve internal tests and sync some of it the README example

#### v1.8.1

- A small type bug fix for newer TypeScript versions
- Internal workflow improvement

### v1.8.0

- Create collections for models provided in IServerAppConfig ahead-of-time (needed for first-time ACID transactions)
- Pluralize all model names
- Add `IServerAppConfig.cacheFiles`
- Add `IServerAppConfig.cacheOptions`
- Add `IServerAppConfig.mongooseConnectionOptions`

#### v1.7.12

- Removed Node and Yarn engines version requirements

#### v1.7.11

- Handled mongoose.connect URL string parser deprecation
- Removed yarn.lock to avoid caching non-latest version during installations in the future
- Added 'husky' and 'npm-run-all' to meseret dependency exports (and used them internally too)

#### v1.7.10

- Re-ordered middleware stream positions to fix some bugs (POSSIBLY A BREAKING CHANGE, in some very extreme cases)
- Upgraded to TypeScript 3.0

#### v1.7.9

- Fix: wrong "https" console.log instead of "http" when ServerApp starts

#### v1.7.8

- Updated dependencies, made changes in tsconfig.json and added declarations.d.ts

#### v1.7.7

- Updated and fixed the version numbers of all dependencies to avoid future static-type issues

#### v1.7.6

- Updated all dependencies and made necessary static type changes and fixes

#### v1.7.5

- Rolled back to the previous project structure in an attempt to fix some bugs.

#### v1.7.4

- Changed `path` to `hostname` in `httpServers` and `httpsServers` `IServerAppConfig` configuration. `path` is now deprecated and will be removed in version 2.
- Re-added the type `ModelFactory.documetify` as a deprecated method (to fix the _wrong_ breaking change from the previous patch release). It will be removed in version 2.
- Improved `tsconfig.json`, linting, installed packages and project structure.

#### v1.7.3

- fixed: typo `documetify` to `documentify` in `ModelFactory`

#### v1.7.2

- fixed: `ServerApp` not properly setting the default NODE_ENV env from the environment variables

#### v1.7.1

- fixed bugs in the example code of the [README](README.md)

### v1.7.0

- fix: removed `outDir` and `rootDir` options from `tsconfig.json`
- FEATURE: moved some `devDependencies` to `dependencies` in `package.json` (resulting in much better static-type support)
- FEATURE: improved `tsconfig.json` and eliminated all `devDependencies` (making `prettier` and `nodemon` commands available)

#### v1.6.4

- fix: added `typeRoots` in `tsconfig.json`

#### v1.6.3

- fixed typescript configuration (no longer requires `tslib`)
- updated dependencies (and, internal: switched from `tslint` to `prettier` for code linting)
- internal: moved built `*.js` and `*.d.ts` files to their own `lib` directory
- internal: removed unnecessary `tslint.json` and `.editorconfig` files

#### v1.6.2

- Improved and amended the [README](README.md)

#### v1.6.1

- Improved the [README](README.md)

### v1.6.0

- Add support for standard `multipart/form-data` file uploads' request body parsing; remove support for `bodyParserExtendTypes` (swapped [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser) for [koa-body](https://www.npmjs.com/package/koa-body))
- Fix: some session related config options always being set to true

#### v1.5.0

- Support a GridFS instance through `ServerApp.grid` (using [gridfs-stream](https://www.npmjs.org/pacakge/gridfs-stream))
- Better examples and explanations in the [README](README.md)

#### v1.4.1

- Fix the SocketIO namespace type bug
- Update packages

### v1.4.0

- Add options to easily configure and read the environment (default: `process['NODE_ENV'] || 'development'`)
- Add a `name` shortcut to `ServerApp` from `ServerApp.config`
- Enhanced `json` configuration (new options for "pretty" responses)
- Enhanced `bodyParser` configuration (new options for encoding, and extending with new types, disabling, setting size limits for form, JSON and text request body types)
- Enhanced `session` configuration (new options for `sessionCookieKey`, `sessionHttpOnly`, `sessionMaxAge`, `sessionOverwrite`, `sessionRenew`, `sessionRolling` and `sessionSigned`)
- Minor code improvements

#### v1.3.3

- Improved the package description
- Fixed some issues in the [README](README.md)

#### v1.3.2

- Fixed an issue in the [README](README.md)

#### v1.3.1

- Improved documentation (in the [README](README.md)) and added package keywords

### v1.3.0

- Add SPA support
- Upgrade package dependency requirements
- Change package description and keywords

#### v1.2.4

- Improve [README](README.md)

#### v1.2.3

- Fix koa-router usage bug

#### v1.2.2

- [README](README.md) fix.
- Minor improvement in the way koa-routers are handled.

#### v1.2.1

- FIX: Make `ServerAppConfig.keys` optional.
- Improve [README](README.md).

### v1.2.0

- Construct Koa app when `ServerApp` is constructed, before calling `ServerApp.start()`.
- Add key and session support.
- Improved [README](README.md) and package.json.

#### v1.1.4

- support Koa@1 legacy middleware internally, using koa-convert.
- add peer dependencies.
- fix a [README](README.md) doc problem.

#### v1.1.3

- FIX (maybe, BREAKING): turn on `IServerAppConfig`'s `log`, `compress`, `bodyParser` and `json` methods by default.
- improve [README](README.md)

#### v1.1.2

- improve [README](README.md)

### v1.1.0

- FEATURE: Add more `IServerAppConfig` options: `compress`, `bodyParser`, `json` and `log`
- Better [README](README.md)

#### v1.0.2

- BREAKING DOC: remove the demo application out of this package.

#### v1.0.1

- Bug fixes

## v1.0.0

- MAJOR FEATURE: Socket.io support
- BREAKING: rename `ModelFactory.doc` to `ModelFactory.documentify`
- BREAKING: rename `ModelFactory.mod` to `ModelFactory.modelify`
- BREAKING: rename `IServerAppConfig.routes` to `IServerAppConfig.routers`
- improved demo that now uses Angular, Socket.io and separates logic from router (NOTE: demo is still in beta)
- improve the [README](README.md) and [package.json](package.json)

### v0.1.0

- BREAKING: improve ModelFactory (remove its abstract constraint)
- add a config option for cache control type
- new and better end-to-end demo app (named "Task Organizer")

#### v0.0.3

- enable 'index.html' as the default load file when hosting public directories

#### v0.0.2

- Added this [CHANGELOG](CHANGELOG.md) to the project
- Also, added a [README](README.md)

#### v0.0.1

- Initial release with basic features (`ServerApp`, `IServerAppConfig`, `ModelFactory` and `FunctionsType`)
