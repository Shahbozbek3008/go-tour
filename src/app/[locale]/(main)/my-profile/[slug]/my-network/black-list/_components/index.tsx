"use client"
import { IconInvestmentEmpty } from "@/assets/icons/investment-empty"
import ClientTranslate from "@/components/common/translation/client-translate"
import FilterInput from "@/components/filter/filter-input"
import FilterSelect from "@/components/filter/filter-select"
import { ParamPagination } from "@/components/filter/param-pagination"
import useSearch from "@/hooks/use-search"
import { useTranslations } from "next-intl"
import Empty from "../../../_components/empty"
import SkeletonTable from "../../_components/skeleton-table"
import CustomTable from "../../_components/table"
import { useBlocksQuery } from "../../_hooks/use-blocks-query"

export const BlackListPage = () => {
    const t = useTranslations()
    const params = useSearch()
    const { data, blocks, isPending } = useBlocksQuery({ params })

    return (
        <>
            <div className="flex flex-col rounded-md bg-white shadow-[var(--card-shadow)]">
                <h3 className="md:hidden font-medium mt-4 ml-3">
                    <ClientTranslate translationKey="filter" />
                </h3>

                <div className="flex flex-col md:flex-row items-stretch md:items-center w-full md:justify-end md:gap-4 clamp-[p,4,6] border-b-1">
                    <div className="hidden md:flex items-center gap-2">
                        <p>
                            <ClientTranslate translationKey="show" />
                        </p>
                        <FilterSelect
                            options={[
                                { id: 10, name: "10" },
                                { id: 20, name: "20" },
                                { id: 30, name: "30" },
                                { id: 40, name: "40" },
                                { id: 50, name: "50" },
                            ]}
                            className="w-17"
                            filterKey="page_size"
                        />
                    </div>

                    <div className="flex w-full flex-col md:flex-row md:items-center md:justify-end gap-4">
                        <div className="w-full md:w-auto min-w-0">
                            <FilterInput />
                        </div>

                        <div className="w-full md:w-auto min-w-0">
                            {/* <SelectControl
                                    name="role"
                                    options={[]}
                                    control={form.control}
                                    placeholder={t("selectRole")}
                                    selectClass="w-full md:w-40 min-h-10 min-w-0"
                                /> */}
                        </div>
                    </div>
                </div>
                {isPending ?
                    <SkeletonTable />
                :   <CustomTable activeTab="blocks" data={blocks} />}

                <ParamPagination
                    count={data?.count}
                    className="mt-12 justify-end"
                />

                {!blocks.length && (
                    <Empty
                        emptyIcon={<IconInvestmentEmpty />}
                        title={t("noActiveListings")}
                        description={t("noActiveListingsDesc")}
                    />
                )}
            </div>
        </>
    )
}
