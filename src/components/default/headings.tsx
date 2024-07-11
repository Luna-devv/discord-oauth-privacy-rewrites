import { BaseProps } from "./types";

export function H1({
    children
}: BaseProps) {
    return (
        <h1 className="text-2xl font-semibold text-white">
            {children}
        </h1>
    );
}

export function H2({
    children
}: BaseProps) {
    return (
        <h2 className="text-xl font-medium text-white">
            {children}
        </h2>
    );
}
