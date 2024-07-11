import { rewriteUrl } from "./utils/rewrite-url";

chrome.tabs.onCreated.addListener((tab) => {
    void rewriteUrl(tab);
});

chrome.tabs.onUpdated.addListener((_id, changeInfo, tab) => {
    console.log(changeInfo);
    if (changeInfo.status !== "loading") return;
    void rewriteUrl(tab);
});
