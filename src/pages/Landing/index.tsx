import { CodeIcon } from "@/components/Icons/Code";
import { DocumentIcon } from "@/components/Icons/Document";
import { center } from "@/styles";
import { AnimateLayout, createSnapshot } from "@hydrophobefireman/ui-anim";
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
        <AnimateLayout
          class={landingNoteButton}
          element="button"
          animId="html"
          initialSnapshot={createSnapshot({
            height: 0,
            width: 0,
            originX: "0%",
            originY: "0%",
          })}
          data-to="/new/html"
          onClick={handleClick}
        >
          <CodeIcon size="4rem" />
          <span>HTML Note</span>
        </AnimateLayout>
        <AnimateLayout
          class={landingNoteButton}
          element="button"
          animId="text"
          initialSnapshot={createSnapshot({
            height: 0,
            width: 0,
            originX: "0%",
            originY: "0%",
          })}
          data-to="/new/text"
          onClick={handleClick}
        >
          <DocumentIcon size="4rem" />
          <span>Plain text Note</span>
        </AnimateLayout>
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
