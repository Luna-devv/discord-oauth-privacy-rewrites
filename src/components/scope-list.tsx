import { OAuth2Scopes } from "discord-api-types/v10";
import { useEffect, useState } from "react";
import { HiBan, HiExclamation } from "react-icons/hi";

import { Checkbox } from "./input/checkbox";

const scopes = Object.values(OAuth2Scopes);

const doNotDisable = [
    OAuth2Scopes.Bot,
    OAuth2Scopes.ApplicationsCommands,
    OAuth2Scopes.Guilds,
    OAuth2Scopes.Identify,
    OAuth2Scopes.ApplicationsEntitlements,
    OAuth2Scopes.RoleConnectionsWrite
] as OAuth2Scopes[];

const pleaseDisable = [
    OAuth2Scopes.GuildsJoin,
    OAuth2Scopes.GroupDMJoins,
    OAuth2Scopes.DMChannelsRead
] as OAuth2Scopes[];

export function ScopeList() {
    const [initital, setInitital] = useState<Record<string, string>>({});

    chrome.storage.sync.get(
        scopes.map((scope) => `scope-${scope}`),
        (data) => {
            setInitital(data);
        }
    );

    return (
        <div className="space-y-2">
            <div className="grid grid-cols-2 w-full">
                {Object.keys(initital).length
                    ?
                    scopes
                        .sort((a, b) => a.localeCompare(b))
                        .map((scope) => (
                            <ScopeToggle
                                key={scope}
                                scope={scope}
                                initial={initital[`scope-${scope}`] === "disabled"}
                            />
                        ))
                    :
                    <></>
                }
            </div>

            <Legend />
        </div>
    );
}

function ScopeToggle({
    initial,
    scope
}: {
    initial: boolean;
    scope: OAuth2Scopes
}) {
    const key = `scope-${scope}` as const;

    const [locked, setLocked] = useState(true);
    const [disabled, setDisabled] = useState(initial);

    function update(checked: boolean) {
        setDisabled(checked);
    }

    useEffect(() => {
        if (locked) return;

        chrome.storage.sync.set({
            [key]:  disabled ? "disabled" : "enabled"
        });
    }, [disabled]);

    useEffect(() =>{
        setTimeout(() => setLocked(false), 500);
    }, []);

    return (
        <div className="flex gap-1 items-center">
            <Checkbox
                checked={disabled}
                onChange={update}
            />

            <span className={disabled ? "line-through opacity-75" : ""}>
                {scope}
            </span>

            {doNotDisable.includes(scope) &&
                <HiBan
                    className="text-blurple"
                    title="Disabling this may break apps"
                />
            }

            {pleaseDisable.includes(scope) &&
                <HiExclamation
                    className="text-red-400 relative top-[1px]"
                    title="omg please disable"
                />
            }
        </div>
    );
}

function Legend() {
    return (
        <div>
            <div className="flex gap-1 items-center">
                <HiBan className="text-[#5865f2] size-4"/>
                <span>Might break commonly used apps</span>
            </div>

            <div className="flex gap-1 items-center">
                <HiExclamation className="text-red-400 size-4" />
                <span>You should really disable this for the sake of your privacy</span>
            </div>
        </div>
    );
}
