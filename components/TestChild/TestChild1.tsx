import {
  createContext,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { hocFn } from "./TestChild2";

export const userContext = createContext("default");

export default function TestChild1(props: { name: string }) {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
}

// const EnhancedHOC = hocFn(TestChild1);
// export default EnhancedHOC;
