export interface NoteProps {
  type: "html" | "text";
  message: string;
}

export interface EditorProps extends NoteProps {
  next(text: string): void;
}
