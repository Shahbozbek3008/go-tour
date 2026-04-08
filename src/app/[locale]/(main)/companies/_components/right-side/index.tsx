"use client"

import { IconPlus } from "@/assets/icons/plus"
import ClientTranslate from "@/components/common/translation/client-translate"
import { ParamPagination } from "@/components/filter/param-pagination"
import { Button } from "@/components/ui/button"
import { useCompanyListQuery } from "../../_hooks/use-company-list-query"
import CompanyCard from "../card"

export default function RightSide() {
    const { data, companyList } = useCompanyListQuery()

    return (
        <>
            <main className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-medium text-3xl mr-2">
                        <ClientTranslate translationKey="companiesOperating" />
                    </h2>
                    <Button variant="gradient" size="lg">
                        <IconPlus />{" "}
                        <span className="hidden xsm:inline">
                            <ClientTranslate translationKey="postaListing" />
                        </span>
                    </Button>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(14rem,1fr))] clamp-[gap,4,6]">
                    {companyList.map((item) => (
                        <CompanyCard key={item.user_id} item={item} />
                    ))}
                </div>
                <ParamPagination
                    pageSize={12}
                    count={data?.count}
                    className="mt-12"
                />
            </main>
        </>
    )
}
