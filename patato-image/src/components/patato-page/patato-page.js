import Heading from "../heading/heading";
import Image from "../image/image";
import _ from "lodash";

class PatatoPage {
  render() {
    const heading = new Heading();
    heading.render(_.upperFirst("patato image"));

    const image = new Image();
    image.render();
  }
}

export default PatatoPage;
