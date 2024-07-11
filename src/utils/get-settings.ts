import { OAuth2Scopes } from "discord-api-types/v10";

const scopes = Object.values(OAuth2Scopes);

type Settings = Record<`scope-${OAuth2Scopes}`, string>;

export function getSettings(): Promise<Settings> {
    return new Promise((resolve) => {
        chrome.storage.sync.get(
            scopes.map((scope) => `scope-${scope}`),
            (data) => resolve(data as Settings)
        );
    });
}
