import VoiceLinkView from "./VoiceLink.html";

interface IVoiceLinkConstructor {
  id: string;
}

const VoiceLink = {
  view: VoiceLinkView,
  constructor: (data: IVoiceLinkConstructor, fragment: DocumentFragment) => {
    const id = fragment.querySelector(".id");
    if (id) {
      id.innerHTML = data.id;
    } else {
      fragment.textContent = "Error loading voice link";
    }
    return fragment;
  },
};

const views = {
  VoiceLink,
};

type ViewName = keyof typeof views;

function loadView(viewString: string) {
  const template = document.createElement("template");
  template.innerHTML = viewString;
  return template.content;
}

type ViewData<V extends ViewName> = Parameters<
  typeof views[V]["constructor"]
>[0];

export function createViewElement<V extends ViewName>(
  viewName: V,
  data: ViewData<V>
) {
  const viewObject = views[viewName];
  const view = viewObject.constructor(data, loadView(viewObject.view));
  return view;
}
