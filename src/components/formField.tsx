import { getIn, useFormikContext } from "formik";
import React from "react";
import { Div, Input, LabelStar } from "../styled-components";
import InputComponent from "./Input";
import LabelComponent from "./label";

interface FormfieldProps {
  label: string;
  labelTextOrNode?: string | React.ReactNode;
  name: string;
  type: string;
  component?: React.ReactNode;
  required?: boolean;
  children?: React.ReactNode;
}

const Formfield: React.FC<FormfieldProps> = ({
  label,
  labelTextOrNode,
  name,
  type,
  children,
  required = false,
}) => {
  const { touched, errors } = useFormikContext();

  return (
    <Div display="flex" flexDirection="column" alignItems="flex-start">
      <Div display="flex" alignItems="center" position="relative">
        <LabelComponent textOrNode={labelTextOrNode}>{label}</LabelComponent>
        {required && (
          <LabelStar>
            <svg width="9" height="9" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
            </svg>
          </LabelStar>
        )}
      </Div>
      {children ? (
        children
      ) : (
        <InputComponent name={name}>
          <Input
            name={name}
            type={type}
            className={
              getIn(touched, name) && getIn(errors, name) ? "invalid" : ""
            }
          />
        </InputComponent>
      )}
    </Div>
  );
};

export default Formfield;
