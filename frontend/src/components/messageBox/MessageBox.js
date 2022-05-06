import React from "react";
import "./messageBox.css";
export default function MessageBox(props) {
  return (
    <div className={props.variant} style={{ padding: "1rem" }}>
      {props.children}
    </div>
  );
}
