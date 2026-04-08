"use client"

import { cn } from "@/lib/utils/shadcn"
import dynamic from "next/dynamic"
import { ReactNode } from "react"
import { Stepper } from "react-form-stepper"
import { StepDTO } from "react-form-stepper/dist/components/Step/StepTypes"
import { StepperProps } from "react-form-stepper/dist/components/Stepper/StepperTypes"

export type TStep = Omit<StepDTO, "label"> & {
    label?: ReactNode
    children?: ReactNode
}
type CustomProps = Omit<StepperProps, "steps"> & {
    steps: TStep[]
    stepClassName?: string
    className?: string
}

const CustomStepper = ({ stepClassName, className, ...props }: CustomProps) => {
    return (
        // @ts-expect-error sdfsd
        <Stepper
            className={cn(
                "p-6 [&_#RFS-Connector.active]:!border-success",
                className,
            )}
            stepClassName={cn(
                "has-[.active]:!bg-success has-[.completed]:!bg-success",
                stepClassName,
            )}
            connectorStateColors={true}
            {...props}
        />
    )
}

export default dynamic(() => Promise.resolve(CustomStepper), {
    ssr: false,
})
