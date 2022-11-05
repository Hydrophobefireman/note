import {useState} from "@hydrophobefireman/ui-lib";

import {MonacoLoader} from "./Monaco";

export function Monaco({value, setValue}) {
  return <MonacoLoader value={value} setValue={setValue} />;
}
