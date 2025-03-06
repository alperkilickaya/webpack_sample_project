import NavigationBar from "./components/navigation-bar/navigation-bar.js";
const navigationItems = [
  {
    id: 1,
    title: "Hello World",
    url: "/hello-world",
  },
  {
    id: 2,
    title: "Patato Image",
    url: "/patato-image",
  },
];

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

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
