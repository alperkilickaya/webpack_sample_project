import { sayHello } from "./hello-world.js";
import { addImage } from "./add-image.js";

document.addEventListener("DOMContentLoaded", () => {
  const changeTextBtn = document.getElementById("changeTextBtn");
  const mainTitle = document.getElementById("mainTitle");

  changeTextBtn.addEventListener("click", () => {
    mainTitle.textContent = "Metin değiştirildi!";
  });

  const sayHelloBtn = document.getElementById("sayHelloBtn");
  sayHelloBtn.addEventListener("click", () => {
    sayHello();
  });

  const addImageBtn = document.getElementById("addImageBtn");
  addImageBtn.addEventListener("click", () => {
    addImage();
  });
});
