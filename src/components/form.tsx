import { FieldArray, Formik } from "formik";
import React from "react";
import {
  Button,
  Span,
  Form as FormComponent,
  Heading,
  Div,
  PrimaryButton,
  SecondaryButton,
} from "../styled-components";

import * as yup from "yup";
import { telRegExp } from "../utls/telRegExp";
import { yupTest } from "../constants/constans";
import { submitForm } from "../api/api";
import Passanger from "./passanger";
import InfoPopup from "./infoPopup";
import Dialog from "./dialog";

interface FormProps {}

//#TODO: адаптив(!)

export type FormInitialValues = {
  surname: string;
  name: string;
  fathersName: string;
  snils: string;
  sex: number;
  date: Date | null;
  citezenship: string;
  docType: number;
  docNum: string;
  tarif: number | string | null;
  fss: boolean;
  agreement: boolean;
  tel: string;
  email: string;
};

export type FinalFormValues = {
  passangers: FormInitialValues[];
};

const Form: React.FC<FormProps> = () => {
  const formInitialValues: FormInitialValues = {
    surname: "",
    name: "",
    fathersName: "",
    snils: "",
    sex: 0,
    date: null,
    citezenship: "AU",
    docType: 0,
    docNum: "",
    tarif: null,
    fss: false,
    agreement: true,
    tel: "",
    email: "",
  };

  const formInitialValue = {
    passangers: [formInitialValues],
  };

  const schema = yup.object().shape({
    passangers: yup.array().of(
      yup.object().shape({
        surname: yup
          .string()
          .matches(yupTest.rusLetters, "Только русские буквы")
          .required("Обязательное поле"),
        name: yup
          .string()
          .matches(yupTest.rusLetters, "Только русские буквы")
          .required("Обязательное поле"),
        fathersName: yup
          .string()
          .matches(yupTest.rusLetters, "Только русские буквы")
          .required("Обязательное поле"),
        snils: yup
          .string()
          .length(14, "Номер снилса указан неверно")
          .required("Обязательное поле"),
        sex: yup.string().required("Обязательное поле"),
        date: yup
          .date()
          .typeError("Не выбрана дата")
          .required("Обязательное поле"),
        citezenship: yup.string().required("Обязательное поле"),
        docType: yup
          .number()
          .moreThan(0, "Нужно выбран тип документа")
          .required("Обязательное поле"),
        docNum: yup.number().required("Обязательное поле"),
        tarif: yup
          .string()
          .typeError("Не выбран тариф")
          .required("Обязательное поле"),
        agreement: yup.boolean().required("Обязательное поле"),
        tel: yup
          .string()
          .matches(telRegExp, "Номер телефона введен не полностью")
          .required("Это обязательное поле"),
        email: yup
          .string()
          .email("Неверно введен email")
          .required("Обязательное поле"),
      })
    ),
  });

  const onFormSubmitHanlder = async (values: FinalFormValues) => {
    try {
      const res = await submitForm(values);
      return res;
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <Heading hidden>Форма заказа</Heading>

      <Formik
        initialValues={formInitialValue}
        validationSchema={schema}
        onSubmit={() => console.log(true)}
      >
        {({
          values,
          dirty,
          isValid,
          setSubmitting,
          isSubmitting,
          resetForm,
        }) => (
          <FormComponent display="flex" flexDirection="column">
            <FieldArray
              name="passangers"
              render={(helpers) => (
                <>
                  {values.passangers.map((el, idx) => (
                    <>
                      <Div
                        display="flex"
                        justifyContent="space-between"
                        flexDirection={{ sm: `column`, md: `row` }}
                      >
                        <Heading
                          as="h2"
                          color="secondary"
                          fontSize="2em"
                          margin="10px 0"
                        >
                          Пассажир №{idx + 1}: место для инвалида
                        </Heading>
                        <Button
                          type="button"
                          color="secondary"
                          bg="transparent"
                          position="relative"
                          disabled={values.passangers.length < 2}
                          onClick={() => helpers.remove(idx)}
                        >
                          <Span position="absolute" top="11px" left="-25px">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M0 10h24v4h-24z" />
                            </svg>
                          </Span>
                          <Span fontSize="120%">Удалить пассажира</Span>
                        </Button>
                      </Div>
                      <Passanger id={idx} />
                    </>
                  ))}
                  <Div
                    display="flex"
                    pt={3}
                    flexDirection={{ sm: `column`, md: `row` }}
                  >
                    <SecondaryButton
                      type="button"
                      mb={{ sm: 3, md: 0 }}
                      mr={{ md: 3 }}
                      onClick={() => {
                        console.log(helpers);
                        helpers.push(formInitialValues);
                      }}
                    >
                      Добавить пассажира
                    </SecondaryButton>
                    <SecondaryButton
                      type="button"
                      mb={{ sm: 3, md: 0 }}
                      mr={{ md: "auto" }}
                      onClick={() => {
                        resetForm();
                      }}
                    >
                      Очистить форму
                    </SecondaryButton>
                    <PrimaryButton
                      type="submit"
                      p={2}
                      disabled={!dirty || isSubmitting || !isValid}
                      onClick={() => setSubmitting(true)}
                      mb={{ sm: 3, md: 0 }}
                      alignSelf={{ md: "flex-end" }}
                    >
                      Зарезервировать места
                    </PrimaryButton>
                  </Div>
                </>
              )}
            />
            {isSubmitting && (
              <Dialog>
                <InfoPopup
                  request={async () => onFormSubmitHanlder(values)}
                  closeHanlder={() => setSubmitting(false)}
                  errorMessage="Не удалось отправить форму"
                >
                  <Span
                    display="flex"
                    alignItems="center"
                    textAlign={{ sm: "center", md: "left" }}
                    fontSize={{ sm: "25px", md: "30px" }}
                  >
                    Форма успешно отправлена!
                  </Span>
                </InfoPopup>
              </Dialog>
            )}
          </FormComponent>
        )}
      </Formik>
    </>
  );
};

export default Form;
