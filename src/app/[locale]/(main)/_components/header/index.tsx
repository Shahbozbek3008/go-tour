import Content from "./content"

export default function Header() {
    return (
        <>
            <header className="relative h-screen bg-black/95 md:h-[calc(100vh-5rem)] overflow-hidden">
                {/* Background Video */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/videos/header.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Overlay to ensure content visibility */}
                <div className="absolute inset-0 bg-black/50 z-1"></div>
                {/* <Threads distance={0.5} amplitude={1} /> */}

                <Content />

                {/* <Button
                variant={"gradient"}
                size={"icon"}
                className="max-w-xl w-full absolute h-14 justify-start p-0.5 bottom-13 left-1/2 -translate-x-1/2 rounded-2xl"
                >
                <div className="relative z-10 flex items-center gap-3 bg-black/80 h-full w-full rounded-2xl px-3.5">
                <Image src={logoIcon} alt="logo icon" />
                <p className="text-lg font-medium w-full text-center text-muted-foreground">
                Looking for something? Ask iNexLynk AI
                </p>
                </div>
                <div className="absolute h-7 left-0 right-0 blur-xl gradient-1"></div>
                </Button> */}
            </header>
        </>
    )
}
