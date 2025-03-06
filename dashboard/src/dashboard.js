const url = window.location.pathname;

if (url.includes("hello-world")) {
  import("HelloWorldApp/HelloWorldPage").then(({ default: HelloWorldPage }) => {
    const helloWorldPage = new HelloWorldPage();
    helloWorldPage.render();
  });
} else if (url.includes("patato-image")) {
  import("PatatoImageApp/PatatoPage").then(({ default: PatatoPage }) => {
    const patatoPage = new PatatoPage();
    patatoPage.render();
  });
}
