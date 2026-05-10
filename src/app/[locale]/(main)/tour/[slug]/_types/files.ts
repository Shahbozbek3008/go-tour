export interface FilesResponse {
    id: number | null
    url: string
    type: "IMAGE" | "VIDEO" | "FILE"
    orderIndex: number
    isMain: boolean
}
