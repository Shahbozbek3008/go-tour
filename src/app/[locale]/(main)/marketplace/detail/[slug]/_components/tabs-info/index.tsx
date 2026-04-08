"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils/shadcn"
import { useTranslations } from "next-intl"
import { useMarketplaceProductQuery } from "../../_hooks/use-marketplace-product-query"
import Description from "../description"
import Documents from "../documents"
import ProductParameters from "../product-parameters"

// const ProductParameters = dynamic(() => import("../product-parameters"))
// const Documents = dynamic(() => import("../documents"))

type TabItem = {
    value: string
    label: string
    Content: React.ComponentType
    enabled: boolean
}

const TabsInfo = () => {
    const t = useTranslations()
    const { data } = useMarketplaceProductQuery()

    const TABS: TabItem[] = [
        {
            value: "description",
            label: t("description"),
            Content: Description,
            enabled: true,
        },
        {
            value: "product-parameters",
            label: t("productParameters"),
            Content: ProductParameters,
            enabled: data?.request_type !== "partnership",
        },
        {
            value: "documents",
            label: t("documents"),
            Content: Documents,
            enabled: true,
        },
    ]

    return (
        <Tabs defaultValue="description" className="w-full">
            <TabsList className={cn("flex w-full")}>
                {TABS.map((t) => (
                    <TabsTrigger
                        key={t.value}
                        value={t.value}
                        className={cn(
                            "bg-background px-4 py-2 font-medium rounded-[4px] cursor-pointer flex-1",
                            "text-text-600",
                            "data-[state=active]:bg-[#F8F7FA] md:data-[state=active]:bg-primary data-[state=active]:text-text-900 md:data-[state=active]:text-white",
                            "clamp-[text,sm,base]",
                        )}
                    >
                        {t.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            {TABS.map((t) => (
                <TabsContent key={t.value} value={t.value} className="mt-4">
                    <t.Content />
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default TabsInfo
