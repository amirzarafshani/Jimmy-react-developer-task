import React from "react";
import { ErrorMessageInterface } from "../../interfaces/errorMessage.interface";

export default function ErrorDisplay(props: ErrorMessageInterface) {
  return <div>{props.error}</div>;
}
