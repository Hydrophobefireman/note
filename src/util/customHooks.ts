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

const getPath = () => Router.path;
export const useLocation = (): string => {
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
type CB = () => void;
export function useInterval(callback: CB, delay: number) {
  const savedCallback = useRef<CB>();

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
