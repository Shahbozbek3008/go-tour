import AiChat from "@/components/common/ai-chat"

export default function Index() {
    return (
        <div className="home-container grid place-items-center mt-10">
            <AiChat className="bg-background shadow-2xl h-full w-full rounded-2xl p-5" />
        </div>
    )
}
