/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { ActionComponent, definePlugin, DocumentActionComponent, DocumentActionCustomDialogComponentProps, DocumentActionProps, type DocumentDefinition } from 'sanity'
import type { ListItemBuilder, StructureResolver } from 'sanity/structure'
import { customDocumentActions } from './documentActions'
import { ConfirmDialogAction, ConfirmDialogAction2 } from './actions/dialogAction'
import { ActionFlightResponse, ActionResult } from 'next/dist/shared/lib/app-router-types'

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'settings',
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type)
        }

        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
})
export const PostsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'posts-actions',
    document: {
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return [
            ConfirmDialogAction2,
            ...prev,
          ]
        }
        return prev
      },

    },

    // tools: (prev) => {
    //   return [
    //     ConfirmDialogAction2,
    //     ...prev,
    //   ]
    // },


  }
})

// The StructureResolver is how we're changing the DeskTool structure to linking to a single "Settings" document, instead of rendering "settings" in a list
// like how "Post" and "Author" is handled.
export const settingsStructure = (
  typeDef: DocumentDefinition,
): StructureResolver => {
  return (S) => {
    // The `Settings` root list item
    // const settingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
    //   S.listItem()
    //     .title(typeDef.title || 'Settings')
    //     .icon(typeDef.icon)
    //     .child(
    //       S.editor()
    //         .id(typeDef.name)
    //         .schemaType(typeDef.name)
    //         .documentId(typeDef.name),
    //     )
    const settingsListItem: ListItemBuilder = // A singleton not using `documentListItem`, eg no built-in preview
      S.listItem()
        .title(typeDef.title || 'Settings')
        .icon(typeDef.icon).child(
          // S.documentList()
          //   .title(typeDef.title || 'Settings')
          //   .schemaType(typeDef.name)
          //   .id("settings")
          //   .filter(`_id == "${typeDef.name}"`)
          S.menuItem()
            .title(typeDef.title || 'Settings')
            .icon(typeDef.icon)
            .child(
              S.lis
            )
        )


    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => listItem.getId() !== typeDef.name,
    )

    return S.list()
      .title('Content')
      .items([settingsListItem, S.divider(), ...defaultListItems])
  }
}
