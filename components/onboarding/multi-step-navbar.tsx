"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";

interface MultiStepNavBarProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        title: string
    }[]
}

const MultiStepNavbar = ({ className, items, ...props }: MultiStepNavBarProps) => {
    const pathname = usePathname()
    return (
        <ul
            className={cn(
                "flex justify-around items-center sm:flex-col sm:justify-start sm:items-start sm:min-w-36 space-x-2 lg:space-x-0 lg:space-y-1 border-2 rounded-lg",
                className
            )}
            {...props}
        >

            {items.map((item) => (
                <li
                    key={item.title}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathname === item.title
                            ? "bg-muted hover:bg-muted"
                            : "hover:bg-transparent hover:underline"
                    )}
                >
                    {item.title}
                </li>

            ))}

        </ul>
    )
}

export default MultiStepNavbar