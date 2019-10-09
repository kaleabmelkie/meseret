import { ServerApp } from 'meseret'

import { serverAppConfig } from './configs/server-app-config'

export const serverApp = new ServerApp(serverAppConfig)

serverApp.start().catch(console.error)
