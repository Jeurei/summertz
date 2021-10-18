import { getIn, useFormikContext } from "formik";
import React from "react";
import { Props } from "react-input-mask";
import {
  Div,
  InputError,
  MaskedInput as MaskedInputComponent,
} from "../styled-components";

const MaskedInput: React.FC<Props> = ({
  id,
  name,
  mask,
  value,
  alwaysShowMask,
  onChange,
  onBlur,
  className,
}) => {
  const { errors, touched } = useFormikContext();
  return (
    <Div position="relative" width={1}>
      <MaskedInputComponent
        id={id}
        name={name}
        mask={mask}
        value={value}
        alwaysShowMask
        onChange={onChange}
        onBlur={onBlur}
        className={
          getIn(touched, "snils") && getIn(errors, "snils") ? "invalid" : ""
        }
      />
      {getIn(touched, name!) && getIn(errors, name!) && (
        <InputError>{getIn(errors, name!)}</InputError>
      )}
    </Div>
  );
};

export default MaskedInput;
