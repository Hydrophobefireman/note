import { css } from "catom";
export const buttonCss = css({
  position: "fixed",
  bottom: ".5rem",
  right: "1rem",
  zIndex: 99999999,
  height: "3rem",
  width: "3rem",
  borderRadius: "50%",
  background: "var(--accent)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: ".3s ease",
  pseudo: { ":hover": { transform: "scale(1.09)" } },
});
