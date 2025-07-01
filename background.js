// chrome.tabs.create({ url: "./update/update.html" });

// On Install and Update Actions
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "./welcome/welcome.html" });
  } else if (details.reason === "update") {
    chrome.tabs.create({ url: "./update/update.html" });
  }

  chrome.contextMenus.create({
    id: "open-welcome",
    title: "Welcome/Help Page",
    contexts: ["action"],
  });
});

// Context Menu Actions
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "open-welcome") {
    chrome.tabs.create({ url: "./welcome/welcome.html" });
  }
});

// Command/Shortcut Listener
chrome.commands.onCommand.addListener(async (command) => {
  // get active tab
  let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  let tab = tabs[0];

  // Check if shortcut is for find-last-watched video
  if (command === "find-last-watched") {
    executeFindLastWatched(tab);
  }

  // Check if shortcut is for find-next-unwatched video
  if (command === "find-next-unwatched") {
    executeFindNextUnwatched(tab);
  }
});

// Inject the find last watched feature
async function executeFindLastWatched(tab) {
  // check a tab was found and check it is being used on the subscriptions page
  if (
    tab &&
    tab.id &&
    tab.url &&
    tab.url.startsWith("https://www.youtube.com/feed/subscriptions")
  ) {
    // inject the find last watched script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["./injections/findLastWatched.js"],
    });
  }
}

// Inject the find next unwatched feature
async function executeFindNextUnwatched(tab) {
  if (
    tab &&
    tab.id &&
    tab.url &&
    tab.url.startsWith("https://www.youtube.com/feed/subscriptions")
  ) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["./injections/findNextUnwatched.js"],
    });
  }
}
