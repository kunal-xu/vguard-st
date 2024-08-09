import { createGlobalState } from "../state";
import { Popup } from "../utils/types";

export const usePopup = createGlobalState<Popup>(["popup"], new Popup());
