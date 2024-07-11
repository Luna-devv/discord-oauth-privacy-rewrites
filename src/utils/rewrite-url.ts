import { OAuth2Scopes } from "discord-api-types/v10";

import { getSettings } from "./get-settings";

const MATCH_URL = /^https?:\/\/((canary|ptb)\.)?discord\.com\/oauth2\/authorize/;

export async function rewriteUrl(tab: chrome.tabs.Tab) {
    if (!tab.id || !tab.url || !tab.url.match(MATCH_URL)) return;

    const scopes = getScopes(tab.url);
    const settings = await getSettings();

    const filteredScopes = scopes.filter((scope) => settings[`scope-${scope}`] !== "disabled");
    if (filteredScopes.length === scopes.length) return;

    chrome.tabs.update(tab.id, {
        url: appendScope(new URL(tab.url), filteredScopes.join(" "))
    });
}

function getScopes(url: string) {
    const { searchParams } = new URL(url);
    const scope = searchParams.get("scope");

    if (!scope || !scope.length) return [];

    return scope.split(/[+%20 ]+/) as OAuth2Scopes[];
}

function appendScope(url: URL, scope: string) {
    const params = new URLSearchParams(url.searchParams);

    params.delete("scope");
    params.append("scope", scope);

    url.search = params.toString();
    return url.toString();
}
