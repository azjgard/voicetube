import { PREFIX } from "./constants";

const SpeechRecognition =
  window.SpeechRecognition || (window as any).webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || (window as any).webkitSpeechGrammarList;

const grammarBasicActions =
  "play | pause | skip | (stop | end | close) voice | (full screen | theater mode)";
const grammarSpeed = "speed (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10)";
const grammarLink = "link (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10)";

const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${PREFIX} (${grammarBasicActions} | ${grammarSpeed} | ${grammarLink})`;

interface IArgs {
  onResult?: (text: string, event: Event) => void;
}

export default function createVoiceListener(args: IArgs) {
  let active = false;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  init();

  function init() {
    recognition.onresult = (event) => {
      if (!args.onResult) return;

      const text = event.results[0][0].transcript.toLowerCase();
      args.onResult(text, event);
    };

    recognition.onerror = (event) => {
      if (event.error !== "no-speech") {
        throw new Error(event.error);
      }
    };

    recognition.onend = (_event) => {
      if (active) recognition.start();
    };
  }

  function start() {
    recognition.start();
    active = true;
  }

  function stop() {
    recognition.stop();
    active = false;
  }

  return {
    start,
    stop,
  };
}
