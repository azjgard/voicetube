export const NUMBER_PARSING_PATTERN = /(\d|\.)+/g;

const NUMBER_WORDS = [
  ["zero", "0"],
  ["won", "1"],
  ["one", "1"],
  ["to", "2"],
  ["too", "2"],
  ["two", "2"],
  ["three", "3"],
  ["for", "4"],
  ["four", "4"],
  ["five", "5"],
  ["\\sv(\\s|$)", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
  ["ten", "10"],
  ["dot", "."],
];

export default function numberWordsToNumbers(str: string) {
  return NUMBER_WORDS.reduce(
    (str, [existingValue, replacementValue]) =>
      str.replace(new RegExp(existingValue, "ig"), replacementValue),
    str
  );
}
