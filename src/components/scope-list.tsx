import { OAuth2Scopes } from "discord-api-types/v10";
import { useEffect, useState } from "react";
import { HiBan, HiExclamation } from "react-icons/hi";

import { cn } from "../utils/cn";
import { rewriteUrl } from "../utils/rewrite-url";
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
    const [loading, setLoading] = useState(true);
    const [initial, setInitial] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        chrome.storage.sync.get(
            scopes.map((scope) => `scope-${scope}`),
            (data) => {
                setInitial(data);
                setLoading(false);

                if (!chrome.runtime.lastError) return;
                setError(chrome.runtime.lastError.message!);
            }
        );
    }, []);

    if (loading && error) return <ErrorBanner message={error} />;
    if (loading) return null;

    return (
        <div className="space-y-2">
            {error &&
                <ErrorBanner message={error} />
            }

            <div className="grid grid-cols-2 w-full">
                {scopes
                    .sort((a, b) => a.localeCompare(b))
                    .map((scope) => (
                        <ScopeToggle
                            key={scope}
                            scope={scope}
                            initial={initial[`scope-${scope}`] === "disabled"}
                            onError={(error) => setError(error.message!)}
                        />
                    ))}
            </div>

            <Legend />
        </div>
    );
}

function ErrorBanner({
    message
}: {
    message: string;
}) {
    return (
        <div className="bg-danger/40 border border-danger">
            {message}
        </div>
    );
}

function ScopeToggle({
    initial,
    scope,
    onError
}: {
    initial: boolean;
    scope: OAuth2Scopes;
    onError: (error: chrome.runtime.LastError) => void;
}) {
    const [disabled, setDisabled] = useState(initial);
    const key = `scope-${scope}` as const;

    function update(checked: boolean){
        chrome.storage.sync.set({
            [key]:  checked ? "disabled" : "enabled"
        }, () => {
            if (chrome.runtime.lastError) {
                onError(chrome.runtime.lastError);
                return;
            }

            setDisabled(checked);

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                void rewriteUrl(tabs[0]);
            });
        });
    }

    return (
        <div className="flex gap-1 items-center">
            <Checkbox
                initial={initial}
                onChange={update}
            />

            <span className={cn(disabled && "line-through opacity-75")}>
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
                    className="text-danger relative top-[1px]"
                    title="omg please disable"
                />
            }
        </div>
    );
}

function Legend() {
    return (
        <div className="text-neutral-50">
            <div className="flex gap-1 items-center">
                <HiBan className="text-blurple size-4"/>
                <span>Might break commonly used apps</span>
            </div>

            <div className="flex gap-1 items-center">
                <HiExclamation className="text-danger size-4 relative top-[1px]" />
                <span>You should really disable this for the sake of your privacy</span>
            </div>
        </div>
    );
}
