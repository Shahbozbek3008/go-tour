import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import MarketplacePostIndex from "./_components"

const Post = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)

    return (
        <>
            <MarketplacePostIndex />
        </>
    )
}

export default Post
