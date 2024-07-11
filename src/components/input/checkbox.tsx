import { useState } from "react";
import { HiX } from "react-icons/hi";

export function Checkbox({
    initial,
    onChange
}: {
    initial: boolean,
    onChange: (checked: boolean) => void;
}) {
    const [checked, setChecked] = useState(initial);

    function update() {
        setChecked(!checked);
        onChange(!checked);
    }

    return (
        <button
            className="border border-[#80848e] size-4 rounded flex items-center justify-center cursor-pointer"
            onClick={update}
            role="checkbox"
        >
            {checked &&
                <HiX className="text-white cursor-pointer" />
            }
        </button>
    );
}
