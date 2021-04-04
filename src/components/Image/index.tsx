import { FakeWeakMap } from "@hydrophobefireman/j-utils";
import {
  useEffect,
  useRef,
  useState,
  ComponentProps,
} from "@hydrophobefireman/ui-lib";

let observer: IntersectionObserver;
const listenerMap = new FakeWeakMap<
  Element,
  (isIntersecting: boolean) => void
>();
let createObserver = function () {
  if (!observer) {
    observer = new IntersectionObserver((e) => {
      e.forEach((entry) => {
        const fn = listenerMap.get(entry.target);
        fn && fn(entry.isIntersecting);
      });
    });
    createObserver = function () {};
  }
};
export default function LazyImage(props: ComponentProps<"img">) {
  createObserver();
  const [intersecting, setIntersecting] = useState(false);
  const [shouldLoad, setLoad] = useState(false);
  const imgRef = useRef<HTMLImageElement>();
  const $src = useRef(props.src);
  useEffect(() => {
    const oldSrc = $src.current;
    const currSrc = props.src;
    if (!intersecting && oldSrc != currSrc) {
      setLoad(false);
    }
    $src.current = currSrc;
  }, [props.src, intersecting]);
  useEffect(() => {
    const current = imgRef.current;
    if (current) {
      observer.observe(current);
      const listener = (value: boolean) => {
        setIntersecting(value);
        setLoad((prev) => value || prev);
      };
      listenerMap.set(current, listener);
    }
    return () => listenerMap.delete(current);
  }, [imgRef.current]);
  const { src, ...rest } = props;
  return <img {...rest} src={shouldLoad ? src : null} ref={imgRef} />;
}

export { LazyImage };
