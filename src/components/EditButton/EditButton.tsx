import { StageContext } from "@/ctx";
import { loadURL, useContext } from "@hydrophobefireman/ui-lib";

import { buttonCss } from "./EditButton.style";

export function EditButton({
  text,
  type,
}: {
  text: string;
  type: "html" | "text";
}) {
  const setStage = useContext(StageContext);
  console.log(setStage);
  return (
    <button
      class={buttonCss}
      onClick={() => {
        const url = `/new/${type}#${new URLSearchParams({
          init: text,
        }).toString()}`;
        loadURL(url);
        setStage && setStage(0);
      }}
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="var(--bg)"
        viewBox="0 0 24 24"
        height="2rem"
        width="2rem"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        ></path>
      </svg>
    </button>
  );
}
