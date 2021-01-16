import { play } from "./play";
import { pause } from "./pause";
import { search } from "./search";
import { fullScreen } from "./fullScreen";
import { speed } from "./speed";
import { link } from "./link";
import { scroll } from "./scroll";

export const commands = {
  play,
  pause,
  search,
  fullScreen,
  speed,
  link,
  scroll,
};

export { classifyCommand } from "./lib/classifyCommand";
