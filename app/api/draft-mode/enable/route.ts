/**
 * This file is used to allow Presentation to set the app in Draft Mode, which will load Visual Editing
 * and query draft content and preview the content as it will appear once everything is published
 */

import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { getClient } from '@/sanity/lib/client'
import { readToken } from '@/sanity/env'

export const { GET } = defineEnableDraftMode({
  client: getClient({
    perspective: 'drafts',
    token: readToken,
  }),
  
})