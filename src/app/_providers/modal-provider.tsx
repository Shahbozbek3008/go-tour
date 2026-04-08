"use client"

import { usePathname } from "next/navigation"
import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

// Define the context interface
interface ModalContextType {
    modals: Record<string, boolean>
    openModal: (key: string) => void
    closeModal: (key: string) => void
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined)

// Client-side modal content component
const ModalProviderContent: FC<{ children: ReactNode }> = ({ children }) => {
    const pathname = usePathname()
    const [modals, setModals] = useState<Record<string, boolean>>({})

    useEffect(() => {
        setModals({})
    }, [pathname])

    const openModal = useCallback((key: string) => {
        setModals((prev) => ({ ...prev, [key]: true }))
    }, [])

    const closeModal = useCallback((key: string) => {
        setModals((prev) => ({ ...prev, [key]: false }))
    }, [])

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    )
}

// Main provider component
export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return <ModalProviderContent>{children}</ModalProviderContent>
}

export const useModalContext = () => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("useModalContext must be used within a ModalProvider")
    }
    return context
}
