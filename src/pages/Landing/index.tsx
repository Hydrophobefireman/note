import { CodeIcon } from "@/components/Icons/Code";
import { DocumentIcon } from "@/components/Icons/Document";
import { center } from "@/styles";

import { loadURL } from "@hydrophobefireman/ui-lib";
import {
  actionButtonContainer,
  answersContainer,
  heading,
  landingNoteButton,
} from "./Landing.styles";

function handleClick(e: JSX.TargetedMouseEvent<any>) {
  const { currentTarget } = e;
  loadURL(currentTarget.dataset.to);
}
/** Exported routes need to be default exports */
export default function Landing() {
  return (
    <div>
      <div class={center}>
        <h1 class={heading}>Notes</h1>
      </div>
      <div class={center}>Private by default, convenient by choice</div>

      <div class={center}>
        <h2>Create a note</h2>
      </div>

      <div class={actionButtonContainer}>
        <button
          class={landingNoteButton}
          data-to="/new/html"
          onClick={handleClick}
        >
          <CodeIcon size="4rem" />
          <span>HTML Note</span>
        </button>
        <button
          class={landingNoteButton}
          data-to="/new/text"
          onClick={handleClick}
        >
          <DocumentIcon size="4rem" />
          <span>Plain text Note</span>
        </button>
      </div>

      <div class={answersContainer}>
        <section>
          <h3>HTML Note?</h3>
          <p>
            Make html documents with all the capabilities of a web page rendered
            in an iframe
          </p>
        </section>
        <section>
          <h3>Plain Text?</h3>
          <p>just text, no styles, only vibes</p>
        </section>
      </div>
    </div>
  );
}
