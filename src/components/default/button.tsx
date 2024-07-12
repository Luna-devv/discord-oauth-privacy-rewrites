import { ButtonStyle } from "discord-api-types/v10";
import { ReactNode } from "react";

import { cn } from "../../utils/cn";
import { BaseProps } from "./types";

interface Props extends BaseProps {
    icon: ReactNode;
    onClick: () => void;
    style?: ButtonStyle;
}

export function Button({
    children,
    icon,
    style = ButtonStyle.Primary,
    ...props
}: Props) {
    return (
        <button
            className={cn(
                "text-medium text-white px-4 py-2 rounded-md flex gap-1.5 items-center duration-200",
                (style === ButtonStyle.Link || style === ButtonStyle.Secondary) && "bg-[#3b3d44] hover:bg-[#35373c]",
                style === ButtonStyle.Danger && "bg-danger hover:bg-danger/80",
                style === ButtonStyle.Success && "bg-green hover:bg-green/80",
                style === ButtonStyle.Primary && "bg-blurple hover:bg-blurple/80"
            )}
            {...props}
        >
            {icon}
            <span>{children}</span>
        </button>
    );
}
