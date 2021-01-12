import Debug from "../../../utils/Debug";

const SpeechRecognition =
  window.SpeechRecognition || (window as any).webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || (window as any).webkitSpeechGrammarList;

const grammar =
  "#JSGF V1.0; grammar phrase; public <phrase> = play | pause | skip | (stop | end | close) voice | full screen";

interface IVoiceListenerConstructor {
  onResult?: (text: string, event: Event) => void;
}

export default class VoiceListener {
  active = false;
  recognition: SpeechRecognition;
  speechRecognitionList: SpeechGrammarList;

  constructor(args: IVoiceListenerConstructor = {}) {
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();

    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    this.recognition = recognition;
    this.speechRecognitionList = speechRecognitionList;

    this.init(args);
  }

  private init({ onResult }: IVoiceListenerConstructor) {
    this.recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      if (onResult) onResult(speechResult, event);
    };

    this.recognition.onerror = (event) => {
      if (event.error !== "no-speech") {
        throw new Error(event.error);
      }
    };

    this.recognition.onend = (event) => {
      if (this.active) this.recognition.start();
    };
  }

  public start() {
    this.recognition.start();
    this.active = true;
  }

  public stop() {
    this.recognition.stop();
    this.active = false;
  }
}

// recognition.onspeechend = () => {
//   // recognition.stop();
// };

// recognition.onaudiostart = (event) => {
//   //Fired when the user agent has started to capture audio.
//   Debug.log("SpeechRecognition.onaudiostart");
// };

// recognition.onaudioend = (event) => {
//   //Fired when the user agent has finished capturing audio.
//   Debug.log("SpeechRecognition.onaudioend");
// };

// recognition.onnomatch = (event) => {
//   //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
//   Debug.log("SpeechRecognition.onnomatch");
// };

// recognition.onsoundstart = (event) => {
//   //Fired when any sound — recognisable speech or not — has been detected.
//   Debug.log("SpeechRecognition.onsoundstart");
// };

// recognition.onsoundend = (event) => {
//   //Fired when any sound — recognisable speech or not — has stopped being detected.
//   Debug.log("SpeechRecognition.onsoundend");
// };

// recognition.onspeechstart = (event) => {
//   //Fired when sound that is recognised by the speech recognition service as speech has been detected.
//   Debug.log("SpeechRecognition.onspeechstart");
// };
// recognition.onstart = (event) => {
//   //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
//   Debug.log("SpeechRecognition.onstart");
// };
