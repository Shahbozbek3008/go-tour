interface RemoteFileInfo {
    name: string
    size: number
    type: string
}

export async function getRemoteFileInfo(url: string): Promise<RemoteFileInfo> {
    try {
        const response = await fetch(url, { method: "HEAD" })

        if (!response.ok) {
            throw new Error("Failed to fetch file info")
        }

        // Get the file name from the Content-Disposition header or URL
        const contentDisposition = response.headers.get("content-disposition")
        let fileName = ""

        if (contentDisposition) {
            const fileNameMatch =
                contentDisposition.match(/filename="?([^"]+)"?/)
            fileName = fileNameMatch ? fileNameMatch[1] : ""
        }

        // If filename is not in Content-Disposition, try to get it from URL
        if (!fileName) {
            fileName = new URL(url).pathname.split("/").pop() || ""
        }

        // Get file size from Content-Length header
        const size = parseInt(response.headers.get("content-length") || "0", 10)

        // Get content type
        const type = response.headers.get("content-type") || ""

        return {
            name: fileName,
            size,
            type,
        }
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error"
        throw new Error(`Failed to get file info: ${errorMessage}`)
    }
}

/**
 * Format file size to human readable format
 * @param bytes File size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
    const units = ["B", "KB", "MB", "GB", "TB"]
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`
}
