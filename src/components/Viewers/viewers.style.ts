import { css } from "catom";

export const iframeCss = css({
  border: "0",
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "#ffffff",
});

export const confDialog = css({
  boxShadow: "var(--box-shadow)",
  maxWidth: "60ch",
  margin: "auto",
  padding: "2rem",
  border: "2px solid var(--accent)",
  borderRadius: "10px",
  marginTop: "20vh",
  animation: "dropDown 0.4s ease",
  animationFillMode: "forwards",
});
