"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";





interface MultiStepNavButtonsProps extends React.HTMLAttributes<HTMLElement> {
    currentStep?: number
    previousLabel: string;
    nextLabel: string;
    isFirstStep: boolean;
    isLastStep: boolean;
    previousStep: () => void;
    nextStep: () => void;
    debug?: boolean;
}

const MultiStepNavButtons = ({ className, ...props }: MultiStepNavButtonsProps) => {
    const { currentStep, previousLabel, nextLabel, isFirstStep, isLastStep, previousStep, nextStep, debug } = props
    return (
        <div className='flex flex-row w-full justify-between mt-4' {...props}>
            {debug && (<pre className="flex justify-center items-center absolute w-32 h-32 right-2 bottom-2 bg-yellow-400 text-black text-sm border-2 rounded-md">{`Current Step: ${currentStep}`}</pre>)}
            <Button
                variant={'default'}
                size={'sm'}
                onClick={previousStep}
                className={cn(`${isFirstStep ? "invisible" : "visible"}`)}
            >{previousLabel}</Button>
            <Button
                variant={'default'}
                size={'sm'}
                onClick={nextStep}
                className={cn(`${isLastStep ? "invisible" : "visible"}`)}
            >{nextLabel}</Button>

        </div>
    )
}

export default MultiStepNavButtons