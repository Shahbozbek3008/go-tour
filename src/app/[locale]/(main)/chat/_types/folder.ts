export interface MessengerFolder {
    id: string
    name: string
    icon: string
    icon_url: string
    chats_count: string
    order_number: number
}

export interface FolderIcon {
    replace(arg0: RegExp, arg1: string): string
    id: string
    icon_url: string
}
