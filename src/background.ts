import { Action } from "./actions";

chrome.runtime.onInstalled.addListener(() => {
    Action.create("extension_installed", { message: "Extension installed successfully" });
  chrome.contextMenus.create({
    id: "openSidePanel1",
    title: "Open Page 1",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "openSidePanel2",
    title: "Open Page 2",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab && tab.windowId) {
    chrome.sidePanel.open({ windowId: tab.windowId });
    if (info.menuItemId === "openSidePanel1") {
        chrome.sidePanel.setOptions({path: "sidepanel1.html"});
    } else if (info.menuItemId === "openSidePanel2") {
        chrome.sidePanel.setOptions({path: "sidepanel2.html"});
    }
  }
});
