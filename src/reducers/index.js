import { combineReducers } from "redux";
import location from "./location";
import animal from "./animal";
import breeds from "./breeds";
import breed from "./breed";

export default combineReducers({ location, animal, breed, breeds });
