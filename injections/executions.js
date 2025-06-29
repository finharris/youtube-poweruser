export async function executeFindLastWatched() {
  // get active tab
  let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  let tab = tabs[0];

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
