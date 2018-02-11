# meseret change log

## v1.3.0

- Add SPA support
- Upgrade package dependency requirements
- Change package description and keywords

## v1.2.4

- Improve README

## v1.2.3

- Fix koa-router usage bug

## v1.2.2

- README fix.
- Minor improvement in the way koa-routers are handled.

## v1.2.1

- FIX: Make `ServerAppConfig.keys` optional.
- Improve README.md.

## v1.2.0

- Construct Koa app when `ServerApp` is constructed, before calling `ServerApp.start()`.
- Add key and session support.
- Improved README.md and package.json.

## v1.1.4

- support Koa@1 legacy middleware internally, using koa-convert.
- add peer dependencies.
- fix a README doc problem.

## v1.1.3

- FIX (maybe, BREAKING): turn on `IServerAppConfig`'s `log`, `compress`, `bodyParser` and `json` methods by default.
- improve README

## v1.1.2

- improve README

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
