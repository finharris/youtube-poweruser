// chrome.tabs.create({ url: "./welcome/welcome.html" }); // TEMP: auto-open on extension reload

// On Install Actions
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "./welcome/welcome.html" });
  }

  chrome.contextMenus.create({
    id: "open-welcome",
    title: "Welcome/Help Page",
    contexts: ["action"],
  });
});

// Context Menu Actions
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "open-welcome") {
    chrome.tabs.create({ url: "./welcome/welcome.html" });
  }
});

// Activate and Inject
chrome.action.onClicked.addListener(async () => {
  let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  let tab = tabs[0];

  if (
    tab &&
    tab.id &&
    tab.url &&
    tab.url.startsWith("https://www.youtube.com/")
  ) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["inject.js"],
    });
  }
});
