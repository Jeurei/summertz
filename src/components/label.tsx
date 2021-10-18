import React from "react";
import { Hint, LabelWithHint, Label } from "../styled-components";

interface LabelProps {
  textOrNode?: string | React.ReactNode;
}

const LabelComponent: React.FC<LabelProps> = ({ children, textOrNode }) => {
  return textOrNode ? (
    <LabelWithHint mb={1} pb={1}>
      <Hint>{textOrNode}</Hint>
      {children}
    </LabelWithHint>
  ) : (
    <Label mb={1} pb={1}>
      <Hint>{textOrNode}</Hint>
      {children}
    </Label>
  );
};

export default LabelComponent;
