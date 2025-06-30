import { settings } from "../injections/settings.js";

// open welcome page on help button click
const helpButton = document.getElementById("help-button");

helpButton.addEventListener("click", () => {
  chrome.tabs.create({ url: "./welcome/welome.html" });
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

// update settings

// max searching scroll count initialise and update
const maxSearchScrollInput = document.getElementById("max-search-scrolls-text");

maxSearchScrollInput.value = settings.maxScrolls.getValue; // TODO - change to local storage

maxSearchScrollInput.addEventListener("change", (element) => {
  settings.maxScrolls.setValue = parseInt(element.target.value);
});
