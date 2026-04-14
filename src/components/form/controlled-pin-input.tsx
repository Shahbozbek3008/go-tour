import { Input } from "@/components/ui/input"
import React, { useRef } from "react"
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

type PinInputProps<T extends FieldValues> = {
    control: Control<T>
    name: FieldPath<T>
    length?: number
    disabled?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export function PinInput<T extends FieldValues>({
    control,
    name,
    length = 6,
    disabled = false,
    ...props
}: PinInputProps<T>) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        value: string[],
        onChange: (val: string) => void,
    ) => {
        const val = e.target.value
        if (!/^[0-9]?$/.test(val)) return

        value[index] = val
        onChange(value.join(""))

        if (val && index < length - 1) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
        value: string[],
        onChange: (val: string) => void,
    ) => {
        if (e.key === "Backspace") {
            if (value[index]) {
                value[index] = ""
                onChange(value.join(""))
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus()
            }
        }
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {
                const rawValue =
                    typeof field.value === "string" ? field.value : ""
                const valueArray = rawValue.split("").slice(0, length)
                while (valueArray.length < length) valueArray.push("")

                return (
                    <div className="flex space-x-4">
                        {Array.from({ length }).map((_, idx) => (
                            <Input
                                key={idx}
                                ref={(el: HTMLInputElement | null) => {
                                    inputsRef.current[idx] = el
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={valueArray[idx]}
                                disabled={disabled}
                                onChange={(e) =>
                                    handleChange(
                                        e,
                                        idx,
                                        [...valueArray],
                                        field.onChange,
                                    )
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(
                                        e,
                                        idx,
                                        [...valueArray],
                                        field.onChange,
                                    )
                                }
                                className="clamp-[w,8,12] clamp-[h,8,12] text-center text-1.5xl font-semibold bg-(--Opacity-Color-Secondary-secondary-8) tracking-widest rounded-lg"
                                {...props}
                            />
                        ))}
                    </div>
                )
            }}
        />
    )
}
