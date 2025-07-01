// open welcome page on help button click
const helpButton = document.getElementById("help-button");

helpButton.addEventListener("click", () => {
  chrome.tabs.create({ url: "welcome/welcome.html" });
});

// logic for showing and hiding tabs
const tabButtons = Array.from(document.getElementsByClassName("tab-button"));
const tabs = Array.from(document.getElementsByClassName("tab"));

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    for (const btn of tabButtons) {
      btn.classList.remove("tab-button-active");
    }
    // Add active class to clicked button
    button.classList.add("tab-button-active");

    // Hide all tabs
    for (const tab of tabs) {
      tab.style.display = "none";
    }

    // Show the tab corresponding to the clicked button
    const tabClass = `${button.value.toLowerCase()}-tab`;
    const targetTab = document.querySelector(`.tab.${tabClass}`);
    if (targetTab) {
      targetTab.style.display = "block";
    }
  });
});

// logic for settings tab

// max searching scroll count initialise and update
const maxSearchScrollInput = document.getElementById("max-search-scrolls-text");

// set value on page
chrome.storage.sync.get("maxSearchScroll", (data) => {
  if (!data.maxSearchScroll) {
    chrome.storage.sync.set({
      maxSearchScroll: parseInt(maxSearchScrollInput.value),
    });
  }
  maxSearchScrollInput.value = data.maxSearchScroll;
});

// update value in storage when changed
maxSearchScrollInput.addEventListener("change", (element) => {
  const value = element.target.value;

  chrome.storage.sync.set({ maxSearchScroll: parseInt(value) });
});
