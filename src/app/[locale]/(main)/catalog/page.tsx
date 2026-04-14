import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"

import { CatalogLayout } from "./_components/catalog-layout"

const Catalog = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)
    return (
        <div className="w-full">
            <CatalogLayout />
        </div>
    )
}

export default Catalog
