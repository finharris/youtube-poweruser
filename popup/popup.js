const helpButton = document.getElementById("help-button");

helpButton.addEventListener("click", () => {
  chrome.tabs.create({ url: "./welcome/welcome.html" });
});
