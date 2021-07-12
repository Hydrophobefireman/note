import { css } from "catom";

import { ViewHtml } from "@/components/Viewers/Html";
import { ViewText } from "@/components/Viewers/Text";
import { usePako } from "@/customHooks";
import { center } from "@/styles";
import { arrayBufferToBase64 } from "@hydrophobefireman/j-utils";
import { useEffect, useState } from "@hydrophobefireman/ui-lib";

import { outputWrapper } from "./NewNote.styles";

const typeToPathMap = { html: "h", text: "t" };
function getUrl(type: string, output: string) {
  return new URL(`/${typeToPathMap[type]}/#${output}`, location.href).href;
}
export function Output({ type, text }: { type: string; text: string }) {
  const output = usePakoGzip(text);
  const url = output && getUrl(type, output);
  const [copied, setCopied] = useState(false);
  function copy(t: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    const { currentTarget } = t;
    navigator.clipboard.writeText(currentTarget.dataset.copy);
    setCopied(true);
  }

  return (
    <div class={center}>
      <div class={outputWrapper}>
        <div>
          {output ? (
            <>
              <button
                data-copy={url}
                onClick={copy}
                class={css({
                  background: "var(--accent)",
                  color: "var(--bg)",
                  padding: ".5rem",
                  borderRadius: "5px",
                  boxShadow: "var(--box-shadow)",
                })}
              >
                copy your note URL ({url.length} chars)
              </button>
              <div>{copied && "(copied!)"}</div>
              <div>
                <h2>Preview</h2>
                <div
                  class={[
                    css({ position: "relative" }),
                    type === "html" ? css({ height: "20vh" }) : "",
                  ]}
                >
                  {type === "html" ? (
                    <ViewHtml ungzipped={window.btoa(text)} />
                  ) : (
                    <ViewText ungzipped={text} />
                  )}
                </div>
              </div>
            </>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
}

function usePakoGzip(text: string) {
  const [output, setOutput] = useState(null);
  const pako = usePako();
  useEffect(() => {
    (async () => {
      if (!pako) return;
      setOutput(await arrayBufferToBase64(pako.gzip(text)));
    })();
  }, [text, pako]);
  return output;
}
