export interface User {
    id: string
    name: string
    title: string
    date: string
    image?: string
    status?: string
}

export type Partner = {
    id: string
    user_id: string
    first_name: string
    last_name: string
    profile_image: string | null
    chat_status: "online" | "away" | "do_not_disturb" | "offline"
    job_title: string
    about: string
    time_zone: string | null
    email: string
    phone_number: string
}
