const buttonsContainer = document.getElementById("buttons");

const findLastWatchedButton = document.createElement("div");
// <img
//   src="./images/assets/clock-rotate-left-solid.svg"
//   alt="find last watched button"
//   class="button-icon"
// />
findLastWatchedButton.innerHTML = `
<p>YT PU Actions</p>
`;
findLastWatchedButton.classList.add("button");

buttonsContainer.insertAdjacentElement("beforebegin", findLastWatchedButton);

findLastWatchedButton.addEventListener("click", () => {
  console.log(true);
});
