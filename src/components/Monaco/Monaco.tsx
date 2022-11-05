import {css} from "catom";
import {emmetHTML} from "emmet-monaco-es";
import {editor} from "monaco-editor";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

import {useLatestRef} from "@hydrophobefireman/kit/hooks";
import {useEffect, useRef} from "@hydrophobefireman/ui-lib";

type Updater<T> = (arg: T | ((previous: T) => T)) => void;

export function MonacoLoader({
  value,
  setValue,
}: {
  value: string;
  setValue: Updater<string>;
}) {
  const ref = useRef<HTMLDivElement>();
  const editorRef =
    useRef<import("monaco-editor").editor.IStandaloneCodeEditor>();
  const dispose = useRef<() => void>();
  const latestValue = useLatestRef(value);
  function cleanup() {
    ref.current && (ref.current.innerHTML = "");
    dispose.current?.();
    editor?.getModels().forEach((x) => x.dispose());
    editorRef.current?.dispose();
  }
  function setup() {
    cleanup();
    editorRef.current = editor.create(
      ref.current.appendChild(
        Object.assign(document.createElement("div"), {
          className: css({height: "100%", width: "100%"}),
        })
      ),
      {
        language: "text/html",
        theme: "vs-dark",
        autoClosingBrackets: "always",
        autoIndent: "brackets",
        tabCompletion: "on",
        value: latestValue.current,
      }
    );
    editorRef.current.onDidChangeModelContent((e) => {
      setValue(editorRef.current.getValue());
    });
    // `emmetHTML` , `emmetCSS` and `emmetJSX` are used the same way
    dispose.current = emmetHTML(
      // monaco-editor it self. If not provided, will use window.monaco instead.
      // This could make the plugin support both ESM and AMD loaded monaco-editor
      monaco,
      // languages needs to support html markup emmet, should be lower case.
      ["html", "php"]
    );
  }
  useEffect(() => {
    addEventListener("resize", setup);
    setup();
    return () => {
      cleanup();
    };
  }, []);
  return (
    <div
      class={css({
        height: "75vh",
        width: "80vw",
        margin: "auto",
        pseudo: {
          " .overflow-guard, .monaco-editor": {borderRadius: "10px"},
        },
      })}
      ref={ref}
    ></div>
  );
}
