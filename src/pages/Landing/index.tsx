import { useEffect, useState } from "@hydrophobefireman/ui-lib";

/** Exported routes need to be default exports */
export default function Landing() {
  return <Clicker />;
}

function Clicker() {
  const [clicks, setClicks] = useState(0);
  const increment = () => setClicks(clicks + 1);

  return (
    <>
      <div>Some UI Lib reactive component</div>
      <button onClick={increment}>Clicked {clicks} time(s)</button>
    </>
  );
}
