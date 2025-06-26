import {
  createContext,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { hocFn } from "./TestChild2";

export const userContext = createContext("default");

function TestChild3(props: { name: string }) {
  return (
    <div>
      <h1>{props.name} in testchild 3</h1>
    </div>
  );
}

const EnhancedHOCIn3 = hocFn(TestChild3);
export default EnhancedHOCIn3;
