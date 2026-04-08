import { useFormContext } from "react-hook-form"
import { CreateFolderForm } from "../_types"

export const useCreateFolderForm = () => {
    const form = useFormContext<CreateFolderForm>()
    const { watch } = form
    const watchIcon = watch("icon")
    const watchChats = watch("with_chats")
    return { ...form, watchIcon, watchChats }
}
