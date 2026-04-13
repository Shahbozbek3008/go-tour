import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormValues, schema } from "../schemas"

export const useUpdateProfile = () => {
    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            birthDate: "",
            gender: "",
            phone: "",
            address: "",
            avatar: "",
        },
    })

    return {
        methods,
    }
}
