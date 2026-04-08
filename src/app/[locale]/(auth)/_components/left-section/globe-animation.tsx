"use client"
import dynamic from "next/dynamic"
import { sampleArcs } from "./data"

const World = dynamic(
    () => import("@/components/ui/globe").then((m) => m.World),
    {
        ssr: false,
    },
)

export function GlobeAnimation() {
    const globeConfig = {
        pointSize: 4,
        globeColor: "#062056",
        showAtmosphere: true,
        atmosphereColor: "#FFFFFF",
        atmosphereAltitude: 0.1,
        emissive: "#062056",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        // Adjust initial position to show the globe from a better angle
        initialPosition: { lat: 30, lng: 0 },
        autoRotate: true,
        autoRotateSpeed: 0.3,
    }

    return (
        <div className="absolute w-[130%] h-[110%] scale-125">
            <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
    )
}
