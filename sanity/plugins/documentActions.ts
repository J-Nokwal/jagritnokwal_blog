/* eslint-disable @typescript-eslint/no-explicit-any */
// ./sanity/config/documentActions.ts
import { DocumentActionProps, DocumentActionComponent } from "sanity";
import { Button } from "@sanity/ui";

export const customDocumentActions = (prev: DocumentActionComponent[]): DocumentActionComponent[] => {
  return [
    ...prev,
    // (props: DocumentActionProps) => ({
    //   label: 'Send to Review',

    //   onHandle: () => {
    //     console.log('Document sent for review:', props.id);
    //     // You can trigger API calls or update fields here
    //     props.onComplete();
    //   },
    // }),
  ];
};
