"use client"

import { IMyNetwork } from "@/app/[locale]/(main)/my-profile/[slug]/my-network/_constants/types"
import { useConnectionsQuery } from "@/app/[locale]/(main)/my-profile/[slug]/my-network/_hooks/use-connection-query"
import { IconArrowRight2 } from "@/assets/icons/arrow-right2"
import { CustomTable } from "@/components/common/custom-table"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useInfinite } from "@/hooks/react-query/use-infinite"
import { useModal } from "@/hooks/use-modal"
import { API } from "@/lib/constants/api-endpoints"
import { MODAL_KEYS } from "@/lib/constants/modal-keys"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useMarketplaceForm } from "../../../_hooks/use-marketplace-form"
import { useColumns } from "./cols"

export default function MyConnections() {
    const t = useTranslations()
    const [search, setSearch] = useState<string | undefined>("")
    const { data, connections: searchedConnections } = useConnectionsQuery({
        params: { search },
    })
    const {
        data: infiniteConnections,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfinite<IMyNetwork>(API.PROFILE.NETWORK.CONNECTIONS)
    const connections = search ? searchedConnections : infiniteConnections
    const filteredConnections = connections.filter(
        (c) => !!c.user && !!c.user?.user_id,
    )
    const cols = useColumns({
        connectionsIds: filteredConnections.map((c) => c.user.user_id),
    })

    const { visibilityPermissionUsersIds } = useMarketplaceForm()
    const { closeModal } = useModal(MODAL_KEYS.VISIBILITY_SETTINGS)

    return (
        <Group className="flex flex-col col-span-2 overflow-x-hidden max-h-[80vh]">
            <div className="flex flex-wrap items-center gap-5 mb-4">
                <h4 className="text-lg">
                    <ClientTranslate translationKey="myConnections" /> (
                    {data?.count})
                </h4>
                <Input
                    type="search"
                    handleDebouncedInputValue={(val) => {
                        setSearch(val || undefined)
                    }}
                    placeholder={t("search")}
                />
            </div>

            <CustomTable
                columns={cols}
                data={connections}
                scrollPaginationProps={{
                    fetchNextPage,
                    hasNextPage,
                    isFetchingNextPage,
                }}
            />

            <div className="mt-4 self-center">
                <Button size="lg" onClick={closeModal}>
                    <ClientTranslate translationKey="selected" />{" "}
                    {visibilityPermissionUsersIds.length}
                    <IconArrowRight2 />
                </Button>
            </div>
        </Group>
    )
}
