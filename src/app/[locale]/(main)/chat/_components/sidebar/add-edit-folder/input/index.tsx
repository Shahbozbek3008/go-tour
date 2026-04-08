"use client"

import ClientTranslate from "@/components/common/translation/client-translate"
import UncontrolledInput from "@/components/form/uncontrolled-input"
import { useCreateFolderForm } from "../_hooks/use-create-folder-form"
import SelectIcon from "./select-icon"

const FolderInput = () => {
    const methods = useCreateFolderForm()

    return (
        <UncontrolledInput
            methods={methods}
            name="name"
            optional
            label={<ClientTranslate translationKey="folderName" />}
            rightNode={<SelectIcon />}
        />
    )
}

export default FolderInput
