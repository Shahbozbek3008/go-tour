"use client"

import { useModal } from "@/hooks/use-modal"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { type ReactNode } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    TDialogContent,
} from "../ui/dialog"

type Props = {
    modalKey?: string
    title?: ReactNode
    description?: ReactNode
    children?: ReactNode
    onClose?: () => void
} & TDialogContent

const Modal = ({
    title,
    description,
    children,
    modalKey = "default",
    onClose,
    disableInteractOutside = false,
    ...props
}: Props) => {
    const { isOpen, closeModal } = useModal(modalKey)

    const handleClose = () => {
        onClose?.()
        closeModal()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            {isOpen && (
                <DialogContent
                    disableInteractOutside={disableInteractOutside}
                    aria-describedby=""
                    {...props}
                >
                    {title ?
                        <DialogTitle>{title}</DialogTitle>
                    :   <VisuallyHidden>
                            <DialogTitle>title</DialogTitle>
                        </VisuallyHidden>
                    }

                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}

                    {children}
                </DialogContent>
            )}
        </Dialog>
    )
}

export default Modal
