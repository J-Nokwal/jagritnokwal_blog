/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { resolve } from 'path'
import { defineCliConfig, getStudioEnvironmentVariables } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ api: { projectId, dataset } ,
    vite(config, env) {
        console.log(JSON.stringify(config.envPrefix),resolve(__dirname))
      return {
        ...config,
        envDir: process.cwd(),
        envPrefix: "NEXT_PUBLIC_",   
        resolve: {
          alias: {
            // "@": resolve(__dirname),
                    "@": resolve(process.cwd(), "."),

          },
        }
      }
    },

})
