# meseret change log

## v1.1.0
- Add more `IServerAppConfig` options: `compress`, `bodyParser`, `json` and `log`

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

- BREAKING: improve ModelFatory (remove its abstract constraint)
- add a config option for cache control type
- new and better end-to-end demo app (named "Task Organizer")

## v0.0.3

- enable 'index.html' as the default load file when hosting public directories

## v0.0.2

- Added this [CHANGELOG](CHANGELOG.md) to the project
- Also, added a [README](README.md)

## v0.0.1

- Initial release with basic features (`ServerApp`, `IServerAppConfig`, `ModelFactory` and `FunctionsType`)
