import { css } from "catom";

import { center, textArea } from "@/styles";

import { EditButton } from "../EditButton/EditButton";

export function ViewText({ ungzipped }: { ungzipped: string }) {
  return (
    <div class={center}>
      <textarea
        class={[textArea, css({ marginTop: "2rem" })]}
        value={ungzipped}
        readOnly
      />
      <EditButton type="text" text={ungzipped} />
    </div>
  );
}
