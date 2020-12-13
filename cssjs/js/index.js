window.onload = () => {
  loadDp();
};

// Load dp
const loadDp = () => {
  const introDpDiv = document.querySelector(".intro__dp");

  const img = document.createElement("img");
  img.setAttribute("src", "images/dp.jpg");
  img.setAttribute("alt", "My display picture");
  introDpDiv.appendChild(img);
};
