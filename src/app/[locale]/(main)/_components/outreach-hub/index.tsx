"use client"

export default function OutreachHub() {
    // const { isAuthenticated } = useProfileQuery()
    // const router = useRouter()
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
        >
            <source src="/videos/outreach-hub.mp4" type="video/mp4" />
        </video>
    )

    // return (
    //     <section className="bg-muted relative lg:pb-[8%] py-12">
    //         <main className="max-w-7xl clamp-[px,5,10] mx-auto flex lg:justify-end lg:items-center text-foreground relative min-h-[50rem] xs:min-h-[64rem] sm:min-h-[72rem] md:min-h-[80rem] [@media(min-width:876px)_and_(max-width:1023px)]:min-h-[92rem] lg:min-h-[60rem]">
    //             <div className="absolute bottom-0 lg:bottom-auto top-auto lg:top-0 left-0 lg:-left-[12%] lg:w-[70%] w-full z-10">
    //                 <Hexagons />
    //             </div>
    //             <div className="w-full sm:text-center sm:it py-12ems-center lg:text-end mt-[5%] lg:mt-[25%] flex flex-col lg:items-end">
    //                 <h2 className="clamp-[text,3xl,6xl] mb-6 max-w-2xl font-medium">
    //                     Discover the Outreach Hub to amplify social impact
    //                     worldwide
    //                 </h2>
    //                 <p className="text-lg mb-8 max-w-md sm:text-black text-text-800">
    //                     Be part of the cause—your support can make a life-saving
    //                     difference. Find exactly what you need with structured
    //                     request cards and quick filters.
    //                 </p>
    //                 {!isAuthenticated && (
    //                     <Button
    //                         variant={"gradient"}
    //                         className="!px-6 font-medium max-w-xl"
    //                         onClick={() =>
    //                             router.push(
    //                                 getHref({ pathname: "/[locale]/sign-up" }),
    //                             )
    //                         }
    //                     >
    //                         Sign Up <ArrowUpRightIcon />
    //                     </Button>
    //                 )}
    //             </div>
    //         </main>
    //     </section>
    // )
}
