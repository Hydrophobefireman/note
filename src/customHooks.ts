import {
  arrayBufferToBase64,
  base64ToArrayBuffer,
} from "@hydrophobefireman/j-utils";
import {
  useState,
  Router,
  useEffect,
  RouterSubscription,
  useRef,
} from "@hydrophobefireman/ui-lib";

function useMount(fn: () => unknown | (() => void)) {
  return useEffect(fn, []);
}

const getPath = () => ({ path: Router.path, qs: Router.qs });
export const useLocation = (): { path: string; qs: string } => {
  const [loc, setLoc] = useState(getPath);
  useMount(() => {
    const current = () => setLoc(getPath);
    RouterSubscription.subscribe(current);
    return () => RouterSubscription.unsubscribe(current);
  });
  return loc;
};

const getDimensions = (): [number, number] => [
  window.innerHeight,
  window.innerWidth,
];
export function useViewportSize(): [number, number] {
  const [dimensions, setDimensions] = useState(getDimensions);
  useMount(() => {
    const callback = () => setDimensions(getDimensions);
    addEventListener("resize", callback);
    return () => removeEventListener("resize", callback);
  });

  return dimensions;
}

export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
function preventDefault(e: Event) {
  e.preventDefault();
}

export function useFileDrop(el?: HTMLElement): [File[] | null, () => void] {
  el = el || document.documentElement;
  const [files, setFiles] = useState(null);
  useEffect(() => {
    const onDrop = (e: DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.dataTransfer.items) {
        const tf = Array.from(e.dataTransfer.items);
        setFiles(
          tf
            .map((i) => (i.kind === "file" ? i.getAsFile() : null))
            .filter(Boolean)
        );
      } else {
        setFiles(Array.from(e.dataTransfer.files));
      }
    };
    el.addEventListener("drop", onDrop);
    el.addEventListener("dragover", preventDefault);
    return () => {
      el.removeEventListener("drop", onDrop);
      el.removeEventListener("dragover", preventDefault);
    };
  }, []);
  return [files && files.length ? files : null, () => setFiles(null)];
}

export function useFocus<T extends HTMLElement>() {
  const ref = useRef<T>();
  useEffect(() => ref.current && ref.current.focus(), [ref.current]);
  return ref;
}

export function usePako() {
  const [pako, setPako] = useState<typeof import("pako")>(null);

  useEffect(() => {
    import("pako").then((x) => setPako(x));
  }, []);
  return pako;
}

export function useUnGzip(hash: string, toString?: boolean) {
  const pako = usePako();
  const [text, setText] = useState<string>(null);
  useEffect(() => {
    if (!pako || !hash) return;
    (async () => {
      const uint8 = new Uint8Array(await base64ToArrayBuffer(hash));
      if (!toString) {
        const ungzip = pako.ungzip(uint8).buffer;
        setText(await arrayBufferToBase64(ungzip));
      } else {
        const ungzip = pako.ungzip(uint8, { to: "string" });
        setText(ungzip);
      }
    })();
  }, [hash, pako, toString]);
  return text;
}
