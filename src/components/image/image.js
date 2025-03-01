import Patato_Image from "./patato.jpg";
import "./image.css";

class Image {
  render() {
    const img = document.createElement("img");
    img.src = Patato_Image;
    img.alt = "Hello World";
    img.classList.add("image");
    const body = document.querySelector("body");
    body.appendChild(img);
  }
}

export default Image;
