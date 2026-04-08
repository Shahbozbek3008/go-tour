"use client"

import { cn } from "@/lib/utils/shadcn"
import debounce from "lodash.debounce"
import { Eye, EyeOff, Search } from "lucide-react"
import * as React from "react"
import { Label } from "./label"

export type InputProps = React.ComponentProps<"input"> & {
    rightNode?: React.ReactNode
    leftNode?: React.ReactNode
    wrapperClassName?: string
    handleDebouncedInputValue?: (val: string) => void
}

function Input({
    className,
    type,
    rightNode,
    leftNode,
    wrapperClassName,
    onChange,
    handleDebouncedInputValue,
    ...props
}: InputProps) {
    const [pwd, setPwd] = React.useState(true)

    // Create debounced function directly without useMemo
    const debouncedFn = React.useRef(
        debounce((value: string) => {
            handleDebouncedInputValue?.(value)
        }, 500),
    ).current

    // Cleanup on unmount
    React.useEffect(() => {
        return () => {
            debouncedFn.cancel()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Label className={cn("relative items-center", wrapperClassName)}>
            {type === "search" && (
                <Search size={18} className="absolute left-2" />
            )}
            {leftNode && <span className="absolute left-2">{leftNode}</span>}
            <input
                type={
                    type === "password" ?
                        pwd ?
                            "password"
                        :   "text"
                    :   type
                }
                data-slot="input"
                className={cn(
                    "text-foreground file:text-foreground placeholder:clamp-[text,sm,base] clamp-[text,sm,base] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex clamp-[h,10,12] w-full min-w-0 rounded-md border bg-background px-3 py-1 md:text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:clamp-[text,sm,base] file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                    "focus-visible: focus-visible: focus-visible:",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    type === "password" ? "font-[Verdana] pr-12" : "",
                    { "pl-10": !!leftNode || type === "search" },
                    { "pr-10": !!rightNode },
                    className,
                )}
                autoComplete="off"
                onChange={(e) => {
                    onChange?.(e)
                    if (handleDebouncedInputValue) {
                        debouncedFn(e.target.value)
                    }
                }}
                {...props}
            />
            {type === "password" && (
                <span
                    onClick={() => {
                        setPwd((prev) => !prev)
                    }}
                    className="absolute right-3"
                >
                    {pwd ?
                        <EyeOff size={16} />
                    :   <Eye size={16} />}
                </span>
            )}
            {rightNode && <span className="absolute right-3">{rightNode}</span>}
        </Label>
    )
}

export { Input }
