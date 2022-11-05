import {css} from "catom";

import {Monaco} from "@/components/Monaco";
import {useFocus} from "@/customHooks";
import {center, textArea} from "@/styles";
import {Switch, useSwitch} from "@hydrophobefireman/kit/input";
import {useState} from "@hydrophobefireman/ui-lib";

import {generateButton, messageCss} from "./NewNote.styles";
import {EditorProps} from "./types";

const defaultValues = {
  html: `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
    Hello World
    </body>
</html>
    `.trim(),
  text: `
    Hello, World!
    `.trim(),
};

function getValFromHash() {
  const hash = location.hash.substr(1);
  if (!hash) return;
  const params = new URLSearchParams(hash);
  return params.get("init");
}

export function Editor({message, type, next}: EditorProps) {
  const [value, setValue] = useState(
    () => getValFromHash() || defaultValues[type]
  );
  const ref = useFocus<HTMLTextAreaElement>();
  const {currentState, toggle} = useSwitch("enabled");
  const useMonaco = currentState === "enabled";
  return (
    <div>
      <div class={messageCss}>{message}</div>
      <div
        class={[
          center,
          css({marginTop: "1.2rem", marginBottom: "1.2rem", gap: ".5rem"}),
        ]}
      >
        <Switch label="Use Monaco" state={currentState} onInput={toggle} />
        <div>Use monaco</div>
      </div>
      <div class={center}>
        {useMonaco ? (
          <div class={css({width: "100%", height: "75vh"})}>
            <Monaco value={value} setValue={setValue} />
          </div>
        ) : (
          <>
            <textarea
              class={textArea}
              value={value}
              onInput={(e) => {
                setValue(e.currentTarget.value);
                preloadPako();
              }}
              spellcheck={type === "text"}
              ref={ref}
            />
          </>
        )}
      </div>
      <div class={center}>
        <button
          class={generateButton}
          onClick={() => {
            next(value);
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

let didImport = false;
function preloadPako() {
  if (didImport) return;
  import("pako");
  didImport = true;
}
