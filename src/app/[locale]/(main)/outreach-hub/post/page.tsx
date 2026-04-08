import { setLocale } from "@/lib/next-intl/set-locale"
import { PropsWithLocaleParams } from "@/types/common"
import OutreachHubPostIndex from "./_components"

const Post = ({ params }: PropsWithLocaleParams) => {
    setLocale(params)

    return <OutreachHubPostIndex />
}

export default Post
