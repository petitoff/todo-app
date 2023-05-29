declare module "*.module.css";
declare module "*.module.scss";
declare module "@fortawesome/free-solid-svg-icons";

declare module "redux-persist/lib/storage" {
  import { WebStorage } from "redux-persist/es/types";

  const localStorage: WebStorage;
  export default localStorage;
}
