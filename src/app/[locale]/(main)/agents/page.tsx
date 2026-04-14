import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import { AgentsLayout } from "./_components/agents-layout"

const Agents = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return (
        <div className="w-full">
            <AgentsLayout />
        </div>
    )
}

export default Agents
