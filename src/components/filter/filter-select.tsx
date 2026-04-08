"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import useSearch from "@/hooks/use-search"
import { usePathname, useRouter } from "@/i18n/navigation"
import { SEARCH_PARAMS } from "@/lib/constants/search-params"
import { getHref, RouteWithoutLocale } from "@/lib/utils/get-href"
import { cn } from "@/lib/utils/shadcn"
import { ReactNode, useEffect } from "react"
import { Path } from "react-hook-form"
import { ActionMeta, SingleValue } from "react-select"
import BaseSelect, { BaseSelectProps } from "../ui/base-select"
import { Label } from "../ui/label"

interface BaseSelectFieldProps<Option> {
    filterKey: string
    currentPageKey?: string
    optionLabelKey?: Path<Option>
    optionValueKey?: Path<Option>
    label?: ReactNode
    wrapperClassname?: string
    pageKey?: string
    onValueChange?: (o: SingleValue<Option>) => void
    inputSearchKey?: string
}

type SelectFieldProps<Option = unknown> = BaseSelectFieldProps<Option> &
    Omit<
        BaseSelectProps<Option, false>,
        keyof BaseSelectFieldProps<Option> | "isMulti"
    >

export default function FilterSelect<Option extends Record<string, any>>({
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
    const search = useSearch()
    const jsonParams = useSearch({ jsonParse: false })
    const value = search[filterKey]

    const currentVal =
        (opts as Option[]).find(
            (o) => o[optionValueKey as keyof Option] === value,
        ) || null

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
                        },
                    } as RouteWithoutLocale),
                )
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.defaultValue])

    const handleOnChange = (
        opt: SingleValue<Option>,
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
                            opt ?
                                JSON.stringify((opt as Option)[optionValueKey])
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
                value={currentVal}
                options={options}
                onChange={handleOnChange}
                placeholder={label}
                {...props}
                isMulti={false}
            />
        </div>
    )
}
