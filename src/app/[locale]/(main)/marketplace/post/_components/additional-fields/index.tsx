"use client"

import { IconPlus } from "@/assets/icons/plus"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { FocusTrap } from "@headlessui/react"
import { Fragment, useState } from "react"
import { FieldArrayWithId, useFieldArray } from "react-hook-form"
import { useMarketplaceForm } from "../../_hooks/use-marketplace-form"
import { MarketplaceProductForm } from "../../_types"
import Field from "./field"
import FieldForm from "./field-form"

export default function AdditionalFields() {
    const { requestType } = useMarketplaceForm()

    if (!requestType?.additionalFields) return

    return <Content />
}

function Content() {
    const { methods } = useMarketplaceForm()
    const { fields, append, remove, update } = useFieldArray({
        control: methods.control,
        name: "additional_fields",
        keyName: "key",
    })

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [field, setField] = useState<
        FieldArrayWithId<MarketplaceProductForm, "additional_fields"> & {
            index: number
        }
    >()

    function closeDrawer() {
        setDrawerOpen(false)
    }
    function openDrawer() {
        setDrawerOpen(true)
    }
    function handleEdit(
        f: FieldArrayWithId<MarketplaceProductForm, "additional_fields"> & {
            index: number
        },
    ) {
        setField(f)
        openDrawer()
    }

    return (
        <div className="flex flex-col rounded-b-xl md:rounded-xl bg-white md:bg-[#F7FAFC] py-6 clamp-[px,2,12] w-full gap-2.5 md:gap-10">
            <h4 className="clamp-[text,base,xl] font-semibold">
                <ClientTranslate translationKey="additionalFields" />
            </h4>

            {!!fields.length && (
                <div className="grid clamp-[gap,2.5,4]">
                    {fields.map((item, index) => (
                        <Fragment key={item.key}>
                            <Field
                                index={index}
                                remove={remove}
                                onClick={() => {
                                    handleEdit({ ...item, index })
                                }}
                            />
                        </Fragment>
                    ))}
                </div>
            )}

            <div className="mt-4">
                <Button
                    type="button"
                    onClick={() =>
                        append({ field_name: "", field_value: "", id: "" })
                    }
                    className="hidden md:flex w-full bg-(--blue-100) hover:bg-(--blue-100) text-primary"
                >
                    <IconPlus className="[&_path]:stroke-primary" />{" "}
                    <ClientTranslate translationKey="add" />
                </Button>

                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button
                            type="button"
                            className="md:hidden w-full bg-(--blue-100) hover:bg-(--blue-100) text-primary"
                            onClick={() => {
                                setDrawerOpen(true)
                                setField(undefined)
                            }}
                        >
                            <IconPlus className="[&_path]:stroke-primary" />{" "}
                            <ClientTranslate translationKey="add" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="pt-10">
                        <FocusTrap>
                            <FieldForm
                                append={append}
                                update={update}
                                field={field}
                                closeDrawer={closeDrawer}
                            />
                        </FocusTrap>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    )
}
