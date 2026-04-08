"use client"

import { cn } from "@/lib/utils/shadcn"
import debounce from "lodash.debounce"
import * as React from "react"
import { Label } from "./label"

export type TextareaProps = React.ComponentProps<"textarea"> & {
    rightNode?: React.ReactNode
    rightNodeClassName?: string
    leftNode?: React.ReactNode
    leftNodeClassName?: string
    wrapperClassName?: string
    handleDebouncedInputValue?: (val: string) => void
}

// ✅ forwardRef bilan to‘liq TypeScript moslik
function Textarea({
    className,
    rightNode,
    rightNodeClassName,
    leftNode,
    leftNodeClassName,
    wrapperClassName,
    onChange,
    handleDebouncedInputValue,
    ref,
    ...props
}: TextareaProps) {
    const innerRef = React.useRef<HTMLTextAreaElement | null>(null)
    const combinedRef = React.useCallback(
        (node: HTMLTextAreaElement | null) => {
            innerRef.current = node
            if (typeof ref === "function") ref(node)
            else if (ref)
                (
                    ref as React.MutableRefObject<HTMLTextAreaElement | null>
                ).current = node
        },
        [ref],
    )

    const debouncedFn = React.useRef(
        debounce((value: string) => handleDebouncedInputValue?.(value), 500),
    ).current

    React.useEffect(() => () => debouncedFn.cancel(), [debouncedFn])

    // ✅ Har safar value o‘zgarsa, textarea o‘lchamini auto sozlaydi
    const autoResize = React.useCallback(() => {
        const el = innerRef.current
        if (!el) return
        el.style.height = "inherit"
        el.style.height = `${el.scrollHeight}px`
    }, [])

    // React 19 layout updates uchun `useLayoutEffect` ishlatamiz
    React.useLayoutEffect(() => {
        autoResize()
    }, [props.value, autoResize])

    return (
        <Label className={cn("relative items-center", wrapperClassName)}>
            {leftNode && (
                <span className={cn("absolute left-2", leftNodeClassName)}>
                    {leftNode}
                </span>
            )}
            <textarea
                ref={combinedRef}
                data-slot="textarea"
                className={cn(
                    "flex field-sizing-content min-h-14 w-full rounded-md border bg-background px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow]",
                    "resize-none border-input placeholder:text-muted-foreground focus-visible:ring-[1px] focus-visible:ring-ring/50",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    { "pl-10": !!leftNode },
                    { "pr-10": !!rightNode },
                    className,
                )}
                onChange={(e) => {
                    onChange?.(e)
                    if (handleDebouncedInputValue) debouncedFn(e.target.value)
                    autoResize()
                }}
                {...props}
            />
            {rightNode && (
                <span className={cn("absolute right-3", rightNodeClassName)}>
                    {rightNode}
                </span>
            )}
        </Label>
    )
}

export { Textarea }
