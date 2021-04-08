import { useFocus } from "@/customHooks";
import { center, textArea } from "@/styles";
import { useState } from "@hydrophobefireman/ui-lib";
import { generateButton, messageCss } from "./NewNote.styles";
import { EditorProps } from "./types";

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
    Hello World\n:)
    `.trim(),
};

export function Editor({ message, type, next }: EditorProps) {
  const [value, setValue] = useState(defaultValues[type]);
  const ref = useFocus<HTMLTextAreaElement>();
  return (
    <div>
      <div class={messageCss}>{message}</div>
      <div class={center}>
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
