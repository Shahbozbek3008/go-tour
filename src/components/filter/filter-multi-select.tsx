"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import useSearch from "@/hooks/use-search"
import { usePathname, useRouter } from "@/i18n/navigation"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { getHref, RouteWithoutLocale } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { ReactNode, useEffect } from "react"
import { Path } from "react-hook-form"
import {
    ActionMeta,
    components,
    MenuListProps,
    MultiValue,
    ValueContainerProps,
} from "react-select"
import BaseSelect, { BaseSelectProps } from "../ui/base-select"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

interface BaseSelectFieldProps<Option> {
    filterKey: string
    currentPageKey?: string
    optionLabelKey?: Path<Option>
    optionValueKey?: Path<Option>
    label?: ReactNode
    wrapperClassname?: string
    pageKey?: string
    onValueChange?: (o: MultiValue<Option>) => void
    inputSearchKey?: string
}

type SelectFieldProps<Option = unknown> = BaseSelectFieldProps<Option> &
    Omit<
        BaseSelectProps<Option, true>,
        keyof BaseSelectFieldProps<Option> | "isMulti"
    >

export default function FilterMultiSelect<Option extends Record<string, any>>({
    filterKey,
    pageKey = SEARCH_PARAMS.PAGE,
    options,
    classNames,
    optionLabelKey = "name" as Path<Option>,
    optionValueKey = "id" as Path<Option>,
    components,
    label,
    wrapperClassname,
    required,
    onValueChange,
    inputSearchKey,
    ...props
}: SelectFieldProps<Option>) {
    const opts = options || []
    const router = useRouter()
    const pathname = usePathname()
    const jsonParams = useSearch({ jsonParse: false })
    const search: any = useSearch()
    const value = search[filterKey]

    const multiCurrentVal = opts.filter((o): o is Option =>
        value?.includes((o as Option)[optionValueKey as keyof Option]),
    )

    useEffect(() => {
        if (props.defaultValue) {
            requestAnimationFrame(() => {
                router.replace(
                    getHref({
                        pathname,
                        query: {
                            ...jsonParams,
                            [filterKey]: JSON.stringify(
                                (props.defaultValue as Option)[optionValueKey],
                            ),
                            [pageKey]: undefined,
                        },
                    } as RouteWithoutLocale),
                )
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.defaultValue])

    const handleOnChange = (
        opt: MultiValue<Option>,
        _actionMeta: ActionMeta<Option>,
    ) => {
        onValueChange?.(opt)

        requestAnimationFrame(() => {
            router.replace(
                getHref({
                    pathname,
                    query: {
                        ...jsonParams,
                        [filterKey]:
                            opt && opt.length ?
                                JSON.stringify(
                                    opt.map((o) => o[optionValueKey]),
                                )
                            :   undefined,
                        [pageKey]: undefined,
                    },
                } as RouteWithoutLocale),
            )
        })
    }

    return (
        <div className={cn("inline-flex flex-col gap-1.5", wrapperClassname)}>
            {label && (
                <Label htmlFor={props.name} required={required}>
                    {label}
                </Label>
            )}
            <BaseSelect
                getOptionLabel={(opt) => opt[optionLabelKey]}
                getOptionValue={(opt) => opt[optionValueKey]}
                value={multiCurrentVal}
                options={options}
                components={{
                    ValueContainer,
                    MenuList,
                    ...components,
                }}
                onChange={handleOnChange}
                placeholder={label}
                {...props}
                isMulti
            />
        </div>
    )
}

const MenuList = <Option,>(props: MenuListProps<Option, true>) => {
    const { children, getValue, options, setValue } = props
    const val = getValue()

    return (
        <components.MenuList {...props}>
            <>
                <p className="flex items-center gap-2 p-2 text-xs">
                    <Checkbox
                        onCheckedChange={(v) => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            v ?
                                setValue(
                                    options.map((o) => o as Option),
                                    "select-option",
                                )
                            :   setValue([], "deselect-option")
                        }}
                        checked={val.length === options.length}
                    />{" "}
                    Barchasini tanlash
                </p>
                <Separator />
            </>
            {children}
        </components.MenuList>
    )
}

const ValueContainer = <Option,>({
    children,
    ...props
}: ValueContainerProps<Option, true>) => {
    // eslint-disable-next-line prefer-const
    let [values, input] = children as ReactNode[]

    if (Array.isArray(values)) {
        values = `${values.length} ta tanlandi`
    }

    return (
        <components.ValueContainer {...props}>
            {values}
            {input}
        </components.ValueContainer>
    )
}
