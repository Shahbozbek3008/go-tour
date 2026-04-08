import IconApple from "@/assets/icons/apple"
import IconGooglePlay from "@/assets/icons/google-play"
import qrcodeImg from "@/assets/images/home/app-qr-code.png"
import smartphoneCaseImg from "@/assets/images/home/case-smartphone.png"
import ClientTranslate from "@/components/common/translation/client-translate"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AppLink() {
    return (
        <section className="bg-muted relative px-4">
            <main
                className="relative z-20 max-w-7xl mx-auto py-14 !clamp-[px,0,20] md:flex items-center gap-[5%] justify-between rounded-[10px] -mb-16"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), linear-gradient(220deg, #00BCE6 13.04%, #D500F9 100%)",
                }}
            >
                <div className="flex flex-col gap-6 max-w-md md:mx-0 mx-auto">
                    <h2 className="clamp-[text,1.75rem,1.875rem] font-medium text-center md:text-start">
                        <ClientTranslate translationKey="fasterDeals" />
                    </h2>
                    <p className="text-xl hidden md:block">
                        <ClientTranslate translationKey="scanAndDownload" />
                    </p>
                    <div className="flex justify-center md:justify-start gap-6">
                        <Button
                            variant={"ghost"}
                            className="py-3 px-6 has-[>svg]:px-6 bg-black hover:bg-black/70 hover:text-background"
                        >
                            <IconApple />
                            <ClientTranslate translationKey="appStore" />
                        </Button>
                        <Button
                            variant={"ghost"}
                            className="py-3 px-6 has-[>svg]:px-6 bg-black hover:bg-black/70 hover:text-background"
                        >
                            <IconGooglePlay />
                            <ClientTranslate translationKey="googlePlay" />
                        </Button>
                    </div>
                </div>

                <div className="flex clamp-[gap,3,24] h-full mt-8">
                    <div className="mx-auto md:mx-0">
                        <p className="md:hidden text-sm mb-7">
                            <ClientTranslate translationKey="scanAndDownload" />
                        </p>
                        <div className="bg-background rounded-[10px] p-4 self-center">
                            <Image
                                src={qrcodeImg}
                                alt="app qr code"
                                className="w-[8.5rem] h-[8.5rem]"
                            />
                        </div>
                    </div>
                    <Image
                        src={smartphoneCaseImg}
                        alt="smartphone case"
                        className="hidden lg:block self-end -mb-14"
                    />
                </div>
            </main>
        </section>
    )
}
