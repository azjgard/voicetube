import { play } from "./play";
import { pause } from "./pause";
import { search } from "./search";
import { fullScreen } from "./fullScreen";
import { speed } from "./speed";
import { link } from "./link";

export const commands = {
  play,
  pause,
  search,
  fullScreen,
  speed,
  link,
};

export { classifyCommand } from "./lib/classifyCommand";
