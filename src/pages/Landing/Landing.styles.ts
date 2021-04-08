import { css } from "catom";

export const heading = css({
  fontSize: "4rem",
  display: "block",
  marginBottom: "1rem",
  color: "var(--alt-font)",
  textTransform: "none",
});

export const landingNoteButton = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  margin: "1rem",
  transition: "0.3s ease",
  padding: "1rem",
  borderRadius: "10px",
  border: "2px solid var(--accent)",
  willChange: "transform",
  animation: " buttonAnim 0.3s ease",
  animationFillMode: "forwards",
  pseudo: {
    ":hover": {
      boxShadow: "var(--box-shadow)",
      transform: "scale(1.05)  translateY(-10px) !important",
    },
  },
});

export const actionButtonContainer = css({
  display: "flex",
  alignItems: "stretch",
  justifyContent: "center",
  margin: "auto",
  width: "80%",
  maxWidth: "600px",
});

export const answersContainer = css({
  padding: "2rem",
  wordBreak: "break-word",
  maxWidth: "80ch",
});
