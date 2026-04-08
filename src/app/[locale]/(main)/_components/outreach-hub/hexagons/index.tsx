"use client"
import { Defs } from "./defs"
import Hexagon1 from "./hexagon1"
import Hexagon10 from "./hexagon10"
import Hexagon2 from "./hexagon2"
import Hexagon3 from "./hexagon3"
import Hexagon4 from "./hexagon4"
import Hexagon5 from "./hexagon5"
import Hexagon6 from "./hexagon6"
import Hexagon7 from "./hexagon7"
import Hexagon8 from "./hexagon8"
import Hexagon9 from "./hexagon9"
import { Other } from "./other"

export default function Hexagons() {
    return (
        <svg
            // width="953"
            // height="1146"
            viewBox="0 0 953 1146"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <Other />
            <Hexagon1 />
            <Hexagon2 />
            <Hexagon3 />
            <Hexagon4 />
            <Hexagon5 />
            <Hexagon6 />
            <Hexagon7 />
            <Hexagon8 />
            <Hexagon9 />
            <Hexagon10 />
            <Defs />
        </svg>
    )
}
