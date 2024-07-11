import { HiX } from "react-icons/hi";

export function Checkbox({
    checked,
    onChange
}: {
    checked: boolean,
    onChange: (checked: boolean) => void;
}) {

    function update() {
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
