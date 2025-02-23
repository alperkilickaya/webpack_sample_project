import Potato from "./potato.jpg";
import altText from "./altText.txt";

export function addImage() {
  const img = document.createElement("img");
  img.src = Potato;
  img.width = 300;
  img.height = 300;
  img.alt = altText;
  document.body.appendChild(img);
}
