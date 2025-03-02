import "./hello-world-button.css";

class HelloWorldButton {
  buttonCssClass = "hello-world-button";
  textCssClass = "hello-world-text";
  text = "Hello world";
  render() {
    const button = document.createElement("button");
    button.innerHTML = this.text;
    button.classList.add(this.buttonCssClass);
    const body = document.querySelector("body");
    button.onclick = () => {
      const p = document.createElement("p");
      p.innerHTML = this.text;
      p.classList.add(this.textCssClass);
      body.appendChild(p);
    };
    body.appendChild(button);
  }
}

export default HelloWorldButton;
