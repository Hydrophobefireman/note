import { css } from "catom";

export const generateButton = css({
  marginTop: "10px",
  background: "var(--accent)",
  color: "var(--bg)",
  padding: ".5rem",
  maxWidth: "250px",
  borderRadius: "10px",
  width: "100%",
  transition: "0.3s ease",
  boxShadow: "var(--box-shadow)",
  pseudo: {
    ":hover": {
      //   background: "var(--bg)",
      //   color: "var(--accent)",
      transform: "scale(1.025)",
    },
  },
});

export const messageCss = css({
  fontSize: "1.3rem",
  marginTop: "2rem",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "1rem",
});

export const outputWrapper = css({
  boxShadow: "var(--box-shadow)",
  width: "60vw",
  wordBreak: "break-word",
  padding: "2rem",
  marginTop: "2rem",
  background: "var(--font)",
  color: "var(--bg)",
  borderRadius: "10px",
});
