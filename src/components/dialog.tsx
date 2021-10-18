import React from "react";
import { Diadlog as DiadlogComponent } from "../styled-components";

interface DialogProps {}

const Dialog: React.FC<DialogProps> = ({ children }) => {
  return <DiadlogComponent>{children}</DiadlogComponent>;
};

export default Dialog;
