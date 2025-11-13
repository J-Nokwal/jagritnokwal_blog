'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId, PREVIEW_MODE_ROUTE} from './sanity/env'
import {structure} from './sanity/structure'
import authorType from './sanity/schemas/author'
import settingsType from './sanity/schemas/settings'
import postType from './sanity/schemas/post'
import { presentationTool } from 'sanity/presentation'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { settingsPlugin, settingsStructure } from './sanity/plugins/settings'
import { locate } from './sanity/plugins/locate'
import { previewDocumentNode } from './sanity/plugins/previewPane'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema:{
    types: [authorType,postType,settingsType],
  },
  plugins: [
    // structureTool({structure}),
     structureTool({
      structure: settingsStructure(settingsType),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),
    presentationTool({
      // resolve: ,
      previewUrl: { previewMode: { enable: PREVIEW_MODE_ROUTE } },
      resolve: {locations: locate},
      
    }),
    settingsPlugin({ type: settingsType.name }),
    unsplashImageAsset(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
