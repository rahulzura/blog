window.onload = () => {
  const introDpDiv = document.querySelector(".intro__dp");

  const img = document.createElement("img");
  img.setAttribute("src", "dp.jpg");
  img.setAttribute("alt", "My display picture");
  introDpDiv.appendChild(img);
};
