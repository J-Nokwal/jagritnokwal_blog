import { Action } from "next-sanity"
import React from "react"
import { dialogContent } from "../paneComponent"
import { DocumentActionComponent, DocumentActionProps } from "sanity"

export function ConfirmDialogAction(prop: DocumentActionProps): ReturnType<DocumentActionComponent> {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)
    const d: ReturnType<DocumentActionComponent> = {
        label: "SSS",
        onHandle: () => {
            setDialogOpen((prev) => !prev)
        },
        dialog: dialogOpen ? {
            type: 'popover',
            onClose: () => {
                setDialogOpen(false)
            },
            content: dialogContent(),
        } : undefined,
    }
    return d;
}

export function ConfirmDialogAction2(prop: DocumentActionProps): ReturnType<DocumentActionComponent> {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)
    const d: ReturnType<DocumentActionComponent> = {
        label: "Revalidate",
        onHandle: () => {
            setDialogOpen((prev) => !prev)
        },
        dialog: dialogOpen ? {
            type: 'dialog',
            onClose: () => {
                setDialogOpen(false)
            },
            content: dialogContent(),
            width: 'full',
        } : undefined,
    }
    return d;
}
export function ConfirmDialogAction3(prop: DocumentActionProps): ReturnType<DocumentActionComponent> {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)
    const d: ReturnType<DocumentActionComponent> = {
        label: "Revalidate",
        onHandle: () => {
            setDialogOpen((prev) => !prev)
        },
        dialog: dialogOpen ? {
            type: 'dialog',
            onClose: () => {
                setDialogOpen(false)
            },
            content: dialogContent(),
            width: 'full',
        } : undefined,
    }
    return d;
}
