import { css } from "catom";
export const unstyledLink = css({ textDecoration: "none" });

export const center = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const textArea = css({
  resize: "none",
  width: "80vw",
  height: "75vh",
  textTransform: "none",
  padding: "1rem",
  borderRadius: "10px",
  outline: "none",
  border: "none",
  boxShadow: "var(--box-shadow)",
  background: "var(--font)",
  color: "var(--bg)",
});
