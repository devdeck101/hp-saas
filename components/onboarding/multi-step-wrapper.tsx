"use client"
import { motion } from "framer-motion"





type Props = {
    title: string;
    description: string;
    children: React.ReactNode;
}

const container = {
    hidden: {
        opacity: 0,
        x: -80
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.5,
            ease: "linear",
            type: "spring", stiffness: 100
        }
    },
    exit: {
        opacity: 0,
        x: 80,
        transition: {
            ease: "easeOut"
        }
    }

}

const MultiStepWrapper = ({ title, description, children }: Props) => {

    return (
        <motion.div
            variants={container}
            className='flex flex-col gap-2'
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="p-2">
                <h2 className='text-xl font-semibold text-primary md:text-2xl'>{title}</h2>
                <p className='text-sm text-neutral-400 md:text-base'>{description}</p>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 shadow-md p-2 '>
                {children}
            </div>
        </motion.div >
    )
}

export default MultiStepWrapper