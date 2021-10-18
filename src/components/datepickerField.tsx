import React from "react";
import ru from "date-fns/locale/ru";
import ReactDatePicker from "react-datepicker";
import MaskedTextInput from "react-text-mask";
import { getIn, useFormikContext } from "formik";
import { Div, InputError } from "../styled-components";

interface DatePickerFieldProps {
  form: {
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void;
    handleBlur: (e: React.FocusEvent<any, Element>) => void;
  };
  field: {
    value: Date | null;
    name: string;
  };
}

type DatePickerFieldType = (props: DatePickerFieldProps) => void;

export const DatePickerField: DatePickerFieldType = ({
  form: { setFieldValue, handleBlur },
  field: { value, name },
}) => {
  const { errors, touched } = useFormikContext();

  return (
    <Div position="relative" width={1}>
      <ReactDatePicker
        selected={value}
        name={name}
        onChange={(val) => setFieldValue(name, val)}
        onBlur={handleBlur}
        dateFormat="dd.MM.yyyy"
        customInput={
          <MaskedTextInput
            type="text"
            showMask
            mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
          />
        }
        locale={ru}
        className={getIn(touched, name) && getIn(errors, name) ? "invalid" : ""}
      />
      {getIn(touched, name) && getIn(errors, name) && (
        <InputError>{getIn(errors, name)}</InputError>
      )}
    </Div>
  );
};

export default DatePickerField;
