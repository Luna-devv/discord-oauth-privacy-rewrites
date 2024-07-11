import { ReactNode } from "react";

import { BaseProps } from "./types";

interface Props extends BaseProps {
    icon: ReactNode;
    href: string;
}

export function Button({
    children,
    icon,
    href
}: Props) {
    return (
        <button
            className="text-medium bg-blurple text-white px-4 py-2 rounded-md flex gap-1.5 items-center"
            onClick={() => window.open(href)}
        >
            {icon}
            <span>{children}</span>
        </button>
    );
}
