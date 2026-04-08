import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"

const Agents = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return <div>Agents</div>
}

export default Agents
