import PrefetchProvider from "@/app/_providers/prefetch-provider"
import { API } from "@/lib/constants/api-endpoints"
import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import { AgentsLayout } from "./_components/agents-layout"

const Agents = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return (
        <PrefetchProvider endpoint={API.TOUR.SEARCH}>
            <PrefetchProvider endpoint={API.AGENTS.ALL}>
                <AgentsLayout />
            </PrefetchProvider>
        </PrefetchProvider>
    )
}

export default Agents
