import { ComponentType, ReactElement } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
export function paneComponent(props: any): ReactElement {
  return (
    <div style={{ maxWidth: "1600px", margin: "0 auto" }}>
      {props.renderDefault(props)}
    </div>
  );
  // return <div>Pane Component</div>
}
