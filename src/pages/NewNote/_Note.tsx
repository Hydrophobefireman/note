import { useState } from "@hydrophobefireman/ui-lib";
import { Editor } from "./Editor";
import { Output } from "./Output";
import { NoteProps } from "./types";

export function Note({ type, message }: NoteProps) {
  const [stage, setStage] = useState<0 | 1>(0);
  const [text, setText] = useState(null);
  if (stage === 0)
    return (
      <Editor
        type={type}
        message={message}
        next={(text: string) => {
          setText(text);
          setStage(1);
        }}
      />
    );
  if (stage === 1) return <Output type={type} text={text} />;
}
