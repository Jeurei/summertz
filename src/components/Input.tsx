import { getIn, useFormikContext } from "formik";
import React from "react";
import { Div, InputError } from "../styled-components";

interface InputProps {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, children }) => {
  const { touched, errors } = useFormikContext();

  return (
    <Div width={1} position="relative">
      {children}
      {getIn(touched, name) && getIn(errors, name) && (
        <InputError>{getIn(errors, name)}</InputError>
      )}
    </Div>
  );
};

export default Input;
