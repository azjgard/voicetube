import { play } from "./play";
import { pause } from "./pause";
import { search } from "./search";
import { fullScreen } from "./fullScreen";

export const commands = {
  play,
  pause,
  search,
  fullScreen,
};

export { classifyCommand } from "./lib/classifyCommand";
