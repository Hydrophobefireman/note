import { ComponentChild } from "@hydrophobefireman/ui-lib";
import { IconProps } from "./types";

export function _icon(
  viewBox: string,
  path: ComponentChild
): (p: IconProps) => JSX.Element {
  return function ({ size: _size, className, invert }: IconProps) {
    const size = _size || 30;
    const prop = invert
      ? { stroke: "var(--bg)", fill: "var(--accent)" }
      : { fill: "var(--bg)", stroke: "var(--accent)" };
    return (
      <svg
        style={{ transition: "0.1s ease" }}
        height={size}
        width={size}
        class={className}
        viewBox={viewBox}
        {...prop}
      >
        {path}
      </svg>
    );
  } as any;
}
