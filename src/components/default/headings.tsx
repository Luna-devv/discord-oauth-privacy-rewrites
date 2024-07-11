import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export function H1 ({
    children
}: Props) {
    return (
        <h1 className="text-2xl font-semibold text-white">
            {children}
        </h1>
    );
}

export function H2 ({
    children
}: Props) {
    return (
        <h2 className="text-xl font-medium text-white">
            {children}
        </h2>
    );
}
