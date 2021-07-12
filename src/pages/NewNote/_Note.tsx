import { StageContext } from "@/ctx";
import { useState } from "@hydrophobefireman/ui-lib";

import { Editor } from "./Editor";
import { Output } from "./Output";
import { NoteProps } from "./types";

export function Note({ type, message }: NoteProps) {
  const [stage, setStage] = useState<0 | 1>(0);
  const [text, setText] = useState(null);
  return (
    <StageContext.Provider value={setStage as any}>
      {stage === 0 ? (
        <Editor
          type={type}
          message={message}
          next={(text: string) => {
            setText(text);
            setStage(1);
          }}
        />
      ) : (
        stage === 1 && <Output type={type} text={text} />
      )}
    </StageContext.Provider>
  );
}
