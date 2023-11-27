const switchElement = document.querySelector('input[type="checkbox"]');
const navElement = document.getElementById("nav");
const switchIcon = document.getElementById("toggle-icon");
const imageElements = document.getElementsByClassName("img-innovation");
const textBoxElement = document.getElementById("text-box");
let appMode = "light";
let oldAppMode = "dark";

function capitalizeName(text) {
  return text[0].toUpperCase() + text.slice(1);
}

function elementToggleClass(element, removeClass, setClass) {
  element.classList.add(setClass);
  element.classList.remove(removeClass);
}

function switchMode() {
  let iconClassAdd = "";
  let iconClassRemove = "";

  switch (appMode) {
    case "light":
      iconClassAdd = "fa-sun";
      iconClassRemove = "fa-moon";
      break;
    default:
      iconClassAdd = "fa-moon";
      iconClassRemove = "fa-sun";
  }
  document.documentElement.setAttribute("data-theme", appMode);
  elementToggleClass(navElement, oldAppMode, appMode);
  elementToggleClass(textBoxElement, oldAppMode, appMode);
  for (let element of imageElements) {
    element.src = element.src.replace(oldAppMode, appMode);
  }
  switchIcon.children[0].textContent = `${capitalizeName(appMode)} Mode`;
  elementToggleClass(switchIcon.children[1], iconClassRemove, iconClassAdd);
}

function switchTheme(event) {
  if (event.target.checked) {
    appMode = "dark";
    oldAppMode = "light";
  } else {
    appMode = "light";
    oldAppMode = "dark";
  }
  localStorage.setItem("theme", appMode);
  switchMode();
}

switchElement.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  appMode = currentTheme;
  if (currentTheme === "dark") {
    switchElement.checked = true;
    oldAppMode = "light";
  } else {
    oldAppMode = "dark";
  }
  switchMode();
}
