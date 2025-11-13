import author from '@/sanity/schemas/author'
import post from '@/sanity/schemas/post'
import settings from '@/sanity/schemas/settings'
import { type SchemaTypeDefinition } from 'sanity'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ author, post, settings ],
}
