import React from "react";

// HOC with props type inference
export function hocFn<P extends object>(WrappedComp: React.ComponentType<P>) {
  return (props: any) => {
    return (
      <WrappedComp {...props} name={props.name}>
        <h1>{props.name}</h1>
        <h1>{props.name} hiiiiiiiiiiiiiii</h1>
      </WrappedComp>
    );
  };
}
