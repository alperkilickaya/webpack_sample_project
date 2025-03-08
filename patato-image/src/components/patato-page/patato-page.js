import Heading from "../heading/heading";
import Image from "../image/image";

import _ from "lodash";

class PatatoPage {
  render() {
    const heading = new Heading();
    heading.render(_.upperFirst("patato image"));

    const image = new Image();
    image.render();

    // dynamic import because it is not needed for the initial load. it is async
    import("ImageCaptionApp/ImageCaption").then((ImageCaptionModule) => {
      const imageCaption = new ImageCaptionModule.default();
      imageCaption.render("This is a caption");
    });
  }
}

export default PatatoPage;
