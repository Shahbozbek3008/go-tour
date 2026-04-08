"use client"

import { IconVector2 } from "@/assets/icons/vector2"
import ClientTranslate from "@/components/common/translation/client-translate"
import Group from "@/components/semantic/group"
import { useAiChatStartMessageQuery } from "../../../_hooks/use-ai-chat-start-message-query"

// interface Section {
//     id: number
//     title: string
//     sub_title: string
//     icon: ReactNode
//     chatType: AiPersistState["chatType"]
// }

// const SECTIONS: Section[] = [
//     {
//         id: 1,
//         title: "Marketplace",
//         sub_title: "Create product & service posts",
//         icon: <IconCart />,
//         chatType: "marketplace_add",
//     },
//     {
//         id: 2,
//         title: "Investment",
//         sub_title: "Generate investor-focused posts",
//         icon: <IconGrowth />,
//         chatType: "investment_add",
//     },
//     {
//         id: 3,
//         title: "Outreach Hub",
//         sub_title: "Make networking & collab posts",
//         icon: <IconTeam />,
//         chatType: "outreach_hub_add",
//     },
// ]

const Empty = () => {
    const { startMessage } = useAiChatStartMessageQuery()

    return (
        <Group className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col gap-4">
                <p className="flex items-center justify-center gap-1 text-4xl">
                    <ClientTranslate translationKey="welcomeToThe" />{" "}
                    <IconVector2 />
                    <span className="text-gradient"> iNex Ai</span>
                </p>
                <p className="text-center text-sm text-(--text-400)">
                    {startMessage || (
                        <ClientTranslate translationKey="readyToAssist" />
                    )}
                </p>
            </div>

            {/* <div className="flex items-center justify-center gap-2 w-full max-w-[80%] mt-15">
                {SECTIONS.map((section) => {
                    return (
                        <div
                            onClick={() => {
                                setAiState({
                                    chatType: section.chatType,
                                })
                            }}
                            key={section.id}
                            className={cn(
                                "border rounded-lg py-4 px-3 w-full transition-all cursor-pointer",
                                "hover:bg-[linear-gradient(220deg,#00BCE6_13.04%,#D500F9_100%)] hover:[&_.text]:text-background hover:[&_.arrow-up-right_path]:fill-background",
                            )}
                        >
                            <Group className="flex items-center justify-between">
                                <div
                                    className={cn(
                                        "flex items-center justify-center rounded-lg w-10 h-10 gradient-3",
                                    )}
                                >
                                    {section.icon}
                                </div>
                                <IconArrowUpRight className="arrow-up-right w-4 h-4 transition duration-200" />
                            </Group>

                            <p className="mt-5 text-lg text">{section.title}</p>
                            <p className="mt-3 text-xs text-text-500 text">
                                {section.sub_title}
                            </p>
                        </div>
                    )
                })}
            </div> */}
        </Group>
    )
}

export default Empty
