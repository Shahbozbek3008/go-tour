import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"

const Catalog = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return <div>Catalog</div>
}

export default Catalog
