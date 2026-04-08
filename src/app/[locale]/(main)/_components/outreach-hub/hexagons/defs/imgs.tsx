import img1 from "@/assets/images/home/img-hexagon-1.png"
import img10 from "@/assets/images/home/img-hexagon-10.png"
import img4 from "@/assets/images/home/img-hexagon-4.png"
import img7 from "@/assets/images/home/img-hexagon-7.png"
import img8 from "@/assets/images/home/img-hexagon-8.png"

export default function Imgs() {
    return (
        <>
            {/* <image
                id="image0_6868_90177"
                width="1024"
                height="1024"
                preserveAspectRatio="none"
                href={img4.src}
                transform="rotate(-90, 500, 500)"
            >
                <animate
                    attributeName="href"
                    values={`${img4.src};${img4.src};${img8.src};${img8.src};${img4.src};`}
                    dur="5s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.4;0.5;0.9;1"
                    keySplines=".42,0,.58,1; .42,0,.58,1; .42,0,.58,1; .42,0,.58,1"
                    begin="0s"
                />
            </image> */}

            <image
                id="image0_6868_90177"
                width="1024"
                height="1024"
                preserveAspectRatio="none"
                href={img4.src}
                transform="rotate(-90, 500, 500)"
            />
            <image
                id="image1_6868_90177"
                width="1024"
                height="1024"
                preserveAspectRatio="none"
                href={img8.src}
                transform="rotate(-90, 500, 500)"
            />
            <image
                id="image2_6868_90177"
                width="1024"
                height="1024"
                preserveAspectRatio="none"
                href={img10.src}
                transform="rotate(-90, 500, 500)"
            />
            <image
                id="image3_6868_90177"
                width="1024"
                height="1024"
                preserveAspectRatio="none"
                href={img1.src}
                transform="rotate(-90, 500, 500)"
            />
            <image
                id="image4_6868_90177"
                width="1024"
                height="1024"
                preserveAspectRatio="none"
                href={img7.src}
            />
        </>
    )
}
