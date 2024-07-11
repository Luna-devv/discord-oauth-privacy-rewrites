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
            className="bg-neutral-700 size-4 rounded flex items-center justify-center cursor-pointer"
            onClick={update}
            role="checkbox"
        >
            {checked &&
                <HiX className="text-violet-400 cursor-pointer" />
            }
        </button>
    );
}
