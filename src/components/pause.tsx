import { ButtonStyle } from "discord-api-types/v10";
import { useEffect, useState } from "react";
import { HiEmojiHappy, HiEmojiSad, HiHand } from "react-icons/hi";

import { cn } from "../utils/cn";
import { rewriteUrl } from "../utils/rewrite-url";
import { Button } from "./default/button";

export function Pause() {
    const [paused, setPaused] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        chrome.storage.sync.get(
            "paused",
            (data) => {
                setPaused(data.paused || false);

                if (!chrome.runtime.lastError) return;
                setError(chrome.runtime.lastError.message!);
            }
        );
    }, [paused]);

    function update() {
        chrome.storage.sync.set({
            paused: !paused
        }, () => {
            if (chrome.runtime.lastError) {
                setError(chrome.runtime.lastError.message!);
                return;
            }

            setPaused(!paused);

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                void rewriteUrl(tabs[0]);
            });
        });
    }

    if (paused === null) return;

    return (
        <div className="space-y-1">
            <Button
                icon={<HiHand />}
                onClick={update}
                style={paused
                    ? ButtonStyle.Primary
                    : ButtonStyle.Secondary
                }
            >
                {paused ? "Re-Start" : "Pause"} Privacy Rewrites
            </Button>

            <div
                className={cn(
                    "flex items-center gap-1 text-medium font-semibold",
                    paused
                        ? "text-danger"
                        : "text-success"
                )}
            >
                {paused
                    ? <HiEmojiSad />
                    : <HiEmojiHappy />
                }
                {paused
                    ? "Rewrites Disabled — Be careful!"
                    : "Rewrites Enabled — You're safe!"
                }
            </div>

            {error &&
                <span className="text-danger">
                    Woops! {error}
                </span>
            }
        </div>
    );
}
