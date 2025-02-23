import Potato from "./potato.jpg";

function addImage() {
  const img = document.createElement("img");
  img.alt = "Potato";
  img.width = 300;
  img.src = Potato;

  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImage;
