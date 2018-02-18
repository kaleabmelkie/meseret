# meseret change log

## v1.6.0

- Add support for standard `multipart/form-data` file uploads' request body parsing; remove support for `bodyParserExtendTypes` (swapped [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser) for [koa-body](https://www.npmjs.com/package/koa-body))

## v1.5.0

- Support a GridFS instance through `ServerApp.grid` (using [gridfs-stream](https://www.npmjs.org/pacakge/gridfs-stream))
- Better examples and explanations in the [README](README.md)

## v1.4.1

- Fix the SocketIO namespace type bug
- Update packages

## v1.4.0

- Add options to easily configure and read the environment (default: `process['NODE_ENV'] || 'development'`)
- Add a `name` shortcut to `ServerApp` from `ServerApp.config`
- Enhanced `json` configuration (new options for "pretty" responses)
- Enhanced `bodyParser` configuration (new options for encoding, and extending with new types, disabling, setting size limits for form, JSON and text request body types)
- Enhanced `session` configuration (new options for `sessionCookieKey`, `sessionHttpOnly`, `sessionMaxAge`, `sessionOverwrite`, `sessionRenew`, `sessionRolling` and `sessionSigned`)
- Minor code improvements

## v1.3.3

- Improved the package description
- Fixed some issues in the [README](README.md)

## v1.3.2

- Fixed an issue in the [README](README.md)

## v1.3.1

- Improved documentation (in the [README](README.md)) and added package keywords

## v1.3.0

- Add SPA support
- Upgrade package dependency requirements
- Change package description and keywords

## v1.2.4

- Improve [README](README.md)

## v1.2.3

- Fix koa-router usage bug

## v1.2.2

- [README](README.md) fix.
- Minor improvement in the way koa-routers are handled.

## v1.2.1

- FIX: Make `ServerAppConfig.keys` optional.
- Improve [README](README.md).

## v1.2.0

- Construct Koa app when `ServerApp` is constructed, before calling `ServerApp.start()`.
- Add key and session support.
- Improved [README](README.md) and package.json.

## v1.1.4

- support Koa@1 legacy middleware internally, using koa-convert.
- add peer dependencies.
- fix a [README](README.md) doc problem.

## v1.1.3

- FIX (maybe, BREAKING): turn on `IServerAppConfig`'s `log`, `compress`, `bodyParser` and `json` methods by default.
- improve [README](README.md)

## v1.1.2

- improve [README](README.md)

## v1.1.0

- FEATURE: Add more `IServerAppConfig` options: `compress`, `bodyParser`, `json` and `log`
- Better [README](README.md)

## v1.0.2

- BREAKING DOC: remove the demo application out of this package.

## v1.0.1

- Bug fixes

## v1.0.0

- MAJOR FEATURE: Socket.io support
- BREAKING: rename `ModelFactory.doc` to `ModelFactory.documentify`
- BREAKING: rename `ModelFactory.mod` to `ModelFactory.modelify`
- BREAKING: rename `IServerAppConfig.routes` to `IServerAppConfig.routers`
- improved demo that now uses Angular, Socket.io and separates logic from router (NOTE: demo is still in beta)
- improve the [README](README.md) and [package.json](package.json)

## v0.1.0

- BREAKING: improve ModelFactory (remove its abstract constraint)
- add a config option for cache control type
- new and better end-to-end demo app (named "Task Organizer")

## v0.0.3

- enable 'index.html' as the default load file when hosting public directories

## v0.0.2

- Added this [CHANGELOG](CHANGELOG.md) to the project
- Also, added a [README](README.md)

## v0.0.1

- Initial release with basic features (`ServerApp`, `IServerAppConfig`, `ModelFactory` and `FunctionsType`)
