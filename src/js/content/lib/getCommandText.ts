import { PREFIX } from "./constants";

export default function getCommandText(text: string) {
  return text.replace(new RegExp(`\s?${PREFIX}\s?`), "");
}
