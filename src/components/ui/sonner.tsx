"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ toastOptions, style, ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    ...style,
                } as React.CSSProperties
            }
            toastOptions={{
                ...toastOptions,
                classNames: {
                    success: "[&_svg]:!text-success",
                    error: "[&_svg]:!text-destructive",
                    warning: "[&_svg]:!text-warning",
                    info: "[&_svg]:!text-info",
                    ...toastOptions?.classNames,
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
