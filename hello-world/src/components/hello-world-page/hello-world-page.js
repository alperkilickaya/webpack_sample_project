import HelloWorldButton from "../hello-world-button/hello-world-button.js";
import Heading from "../heading/heading.js";
import _ from "lodash";

class HelloWorldPage {
  render() {
    const heading = new Heading();
    heading.render(_.upperFirst("hello world"));

    const helloWorldButton = new HelloWorldButton();
    helloWorldButton.render();
  }
}

export default HelloWorldPage;
