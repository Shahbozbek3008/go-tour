import { cn } from "@/lib/utils/shadcn"
import { IconProps } from "./types"

export default function TelegramIcon({ className, ...props }: IconProps) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-4.5 h-4.5", className)}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.6973 6.49825C-0.505045 7.23518 -0.584253 10.3211 1.5774 11.1701L9.45512 14.2638C9.58381 14.3144 9.68565 14.4162 9.73618 14.5449L12.8299 22.4226C13.6789 24.5843 16.7648 24.505 17.5018 22.3027L23.8672 3.27943C24.5181 1.33408 22.6659 -0.518112 20.7206 0.132825L1.6973 6.49825ZM2.30445 9.31876C1.87212 9.14898 1.88796 8.53179 2.32843 8.3844L19.8481 2.52211L10.021 12.3492L2.30445 9.31876ZM11.5204 13.6626C11.5444 13.7134 11.5668 13.7652 11.5875 13.8178L14.6812 21.6956C14.851 22.1279 15.4682 22.112 15.6156 21.6716L21.7026 3.48038L11.5204 13.6626Z"
                fill="currentColor"
            />
        </svg>
    )
}
