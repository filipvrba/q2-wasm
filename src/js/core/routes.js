import routesObj from "../../json/routes.json";
window.ROUTES_JSON = routesObj;
import errorHTML from "../../html/error.html?raw";
import signinHTML from "../../html/signin.html?raw";
window.PAGES = {error: errorHTML, signin: signinHTML}