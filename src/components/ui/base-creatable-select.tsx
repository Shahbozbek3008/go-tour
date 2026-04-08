"use client"

import { cn } from "@/lib/utils/shadcn"
import debounce from "lodash.debounce"
import { ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"
import { useCallback } from "react"
import { ClassNamesConfig, GroupBase } from "react-select"
import CreatableSelect, { CreatableProps } from "react-select/creatable"
import ClientTranslate from "../common/translation/client-translate"

export interface BaseCreatableSelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
> extends CreatableProps<Option, IsMulti, Group> {
    handleDebouncedInputValue?: (val: string) => void
}

function BaseCreatableSelect<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>({
    classNames,
    components: customComponents,
    styles,
    handleDebouncedInputValue,
    ...props
}: BaseCreatableSelectProps<Option, IsMulti, Group>) {
    const debouncedSearch = debounce((val: string) => {
        handleDebouncedInputValue?.(val)
    }, 500)
    const handleInputChange = useCallback(
        (val: string) => {
            if (handleDebouncedInputValue) {
                debouncedSearch(val)
            }
        },
        [debouncedSearch, handleDebouncedInputValue],
    )

    return (
        <CreatableSelect
            components={{
                DropdownIndicator: ReactSelectDropdownIndicator,
                ...customComponents,
            }}
            isClearable
            classNames={{
                ...defaultReactSelectClassNames<Option, IsMulti, Group>(),
                ...classNames,
            }}
            unstyled
            hideSelectedOptions={false}
            closeMenuOnSelect={props.isMulti ? false : true}
            placeholder={<ClientTranslate translationKey="selectOrAddNew" />}
            menuPortalTarget={document.body}
            styles={{
                menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
                    pointerEvents: "all",
                }),
                ...styles,
            }}
            // @ts-expect-error default
            getOptionValue={(o) => String(o.id)}
            // @ts-expect-error default
            getOptionLabel={(o) => o.id}
            onInputChange={handleInputChange}
            // @ts-expect-error asdf
            getNewOptionData={(val) => {
                return { id: val }
            }}
            formatOptionLabel={(o, { context }) => {
                const existingOpt = props.options?.find(
                    // @ts-expect-error asdf
                    (opt) => opt.id === o.id,
                )
                // @ts-expect-error asdf
                if (existingOpt || context === "value") return o.id
                return (
                    <div>
                        tap enter to add
                        {/* @ts-expect-error asdf */}
                        <strong> {o.id}</strong>
                    </div>
                )
            }}
            {...props}
        />
    )
}

export const defaultReactSelectClassNames = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(): ClassNamesConfig<Option, IsMulti, Group> => ({
    control: ({
        isFocused,
        isDisabled,
    }: {
        isFocused: boolean
        isDisabled: boolean
    }) =>
        cn(
            "!clamp-[min-h,10,12] flex rounded-md border border-input bg-background px-3 clamp-[text,sm,base] shadow-sm transition-colors file:border-0 file:bg-transparent file:clamp-[text,sm,base] file:font-medium",
            isFocused ? "outline-none ring-2 ring-ring" : "",
            isDisabled ? "opacity-50" : "",
        ),
    placeholder: () => cn("text-muted-foreground truncate"),
    clearIndicator: () => cn("text-primary"),
    menuList: () =>
        cn(
            "mt-2 p-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
        ),
    option: ({ isSelected }: { isSelected: boolean }) =>
        cn(
            "border-b last:border-none first:rounded-t-md last:rounded-b-md px-2 py-1.5 !clamp-[text,sm,base] outline-none hover:bg-secondary",
            isSelected ?
                "bg-primary/70 hover:bg-primary/70 text-background"
            :   "",
        ),
    multiValue: () =>
        cn("bg-secondary rounded-md px-[4px] py-[2px] gap-1 justify-between"),
    valueContainer: () => "gap-1",
})

export const ReactSelectDropdownIndicator = () => (
    <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
)

export default dynamic(() => Promise.resolve(BaseCreatableSelect), {
    ssr: false,
}) as typeof BaseCreatableSelect
