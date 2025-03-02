import Heading from "./components/heading/heading";
import Image from "./components/image/image";
import _ from "lodash";
const heading = new Heading();
heading.render(_.upperFirst("patato image"));

const image = new Image();
image.render();

import("HelloWorldApp/HelloWorldButton").then(
  ({ default: HelloWorldButton }) => {
    const helloWorldButton = new HelloWorldButton();
    helloWorldButton.render();
  }
);
