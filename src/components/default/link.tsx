import { HiExternalLink } from "react-icons/hi";

import { BaseProps } from "./types";

interface Props extends BaseProps {
    href: string;
}

export function Link({
    children,
    href
}: Props) {
    return (
        <a
            className="text-blurple hover:underline flex gap-0.5 items-center cursor-pointer"
            href={href}
            target="_blank"
        >
            <span>{children}</span>
            <HiExternalLink />
        </a>
    );
}
