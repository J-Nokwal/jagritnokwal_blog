import { ComponentType, ReactElement, ReactNode } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function paneComponent(props: any): ReactElement {
  return (
    <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
      {props.renderDefault(props)}
    </div>
  );
  // return <div>Pane Component</div>
}

export function dialogContent(): ReactNode {
  return (<div className="m-auto w-full h-full">
    <h3>👋  I'm a dialog</h3>
    <img src="sanity.svg" style={{ width: '100%' }} />
    <p>
      I'm suitable for longer and more diverse forms of content.
    </p>
  </div>);
}