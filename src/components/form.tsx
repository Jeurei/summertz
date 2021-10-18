import { Formik, getIn } from "formik";
import React, { useState } from "react";
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  Fieldset,
  Input,
  P,
  Span,
  Form as FormComponent,
  Heading,
  Div,
} from "../styled-components";
import Checkbox from "./checkbox";
import InputComponent from "./Input";
import * as yup from "yup";
import Formfield from "./formField";
import { telRegExp } from "../utls/telRegExp";
import DatePickerField from "./datepickerField";
import { inputMasksMap, yupTest } from "../constants/constans";
import MaskedInput from "./maskedInput";
import { submitForm } from "../api/api";

interface FormProps {}

//#TODO: диалог на сабмит формы плашка что тариф очистка не выбран тариф нельзя выбипрать пока нет даты имени и тд в тарифе должно отрисовываться детский если лет меньше 10 функционал добавления пассажира адаптив(!)

export type FormInitialValues = {
  surname: string;
  name: string;
  fathersName: string;
  snils: string;
  sex: number;
  date: Date | null;
  citizenship: string;
  docType: number;
  docNum: string;
  tarif: number | string | null;
  fss: boolean;
  agreement: boolean;
  tel: string;
  email: string;
};

const Form: React.FC<FormProps> = () => {
  const formInitialValues: FormInitialValues = {
    surname: "",
    name: "",
    fathersName: "",
    snils: "",
    sex: 0,
    date: null,
    citizenship: "",
    docType: 0,
    docNum: "",
    tarif: null,
    fss: false,
    agreement: true,
    tel: "",
    email: "",
  };

  const [pagssangers, setPassangers] = useState<FormInitialValues[]>([
    formInitialValues,
  ]);

  const schema = yup.object().shape({
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
    date: yup.date().typeError("Не выбрана дата").required("Обязательное поле"),
    citizenship: yup.string().required("Обязательное поле"),
    docType: yup
      .number()
      .moreThan(0, "Нужно выбран тип документа")
      .required("Обязательное поле"),
    docNum: yup.number().required("Обязательное поле"),
    tarif: yup.number().required("Обязательное поле"),
    agreement: yup.boolean().required("Обязательное поле"),
    tel: yup
      .string()
      .matches(telRegExp, "Номер телефона введен не полностью")
      .required("Это обязательное поле"),
    email: yup
      .string()
      .email("Неверно введен email")
      .required("Обязательное поле"),
  });

  const onFormSubmitHanlder = async (values: FormInitialValues) => {
    try {
      const res = await submitForm(values);
      console.log(res);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <Heading hidden>Форма заказа</Heading>
      <Div display="flex" justifyContent="space-between">
        <Heading as="h2" color="secondary" fontSize="2em" margin="10px 0">
          Пассажир №1: место для инвалида
        </Heading>
        <Button
          type="button"
          color="secondary"
          bg="transparent"
          position="relative"
        >
          <Span position="absolute" top="11px" left="-25px">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 10h24v4h-24z" />
            </svg>
          </Span>
          <Span fontSize="120%">Удалить пассажира</Span>
        </Button>
      </Div>
      <Formik
        initialValues={formInitialValues}
        validationSchema={schema}
        onSubmit={onFormSubmitHanlder}
      >
        {({
          values,
          setFieldValue,
          touched,
          errors,
          handleChange,
          handleBlur,
          dirty,
          isSubmitting,
          isValid,
          setSubmitting,
        }) => (
          <FormComponent display="flex" flexDirection="column">
            <Fieldset mb={3}>
              <InputComponent name="fss">
                <label>
                  <Checkbox
                    checked={values.fss}
                    onChange={() => setFieldValue("fss", !values.fss)}
                    name="fss"
                    labelWrap={false}
                  />
                  <Span ml={2} fontWeight="bold">
                    Оформление билета по ФСС
                  </Span>
                </label>
              </InputComponent>
            </Fieldset>
            <Fieldset
              display="grid"
              gridColumnGap={4}
              gridTemplateColumns="repeat(3, 1fr)"
              mb={3}
            >
              <Formfield
                labelTextOrNode="Идентификационный номер инвалида, выданный в Центре содействия мобильности."
                label="СНИЛС или номер регистрации ЦСМ"
                name="snils"
                type="text"
              >
                <MaskedInput
                  id="snils"
                  name="snils"
                  mask={inputMasksMap.snils}
                  value={values.snils}
                  alwaysShowMask
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Formfield>
            </Fieldset>
            <Fieldset
              display="grid"
              gridColumnGap={4}
              gridRowGap={4}
              gridTemplateColumns="repeat(3, 1fr)"
              mb={3}
            >
              <Formfield
                name="surname"
                label="Фамилия"
                type="text"
                required
              ></Formfield>
              <Formfield
                name="name"
                label="Имя"
                type="text"
                required
              ></Formfield>
              <Formfield
                name="fathersName"
                label="Отчество (обязательно при наличии)"
                type="text"
                labelTextOrNode="Если в документе удостоверяющем личность у Вас нет отчества, поставьте в поле дефис (символ ' - ')."
                required
              ></Formfield>
              <Formfield name="sex" label="Пол" type="text" required>
                <InputComponent name="sex">
                  <Input
                    component="select"
                    id="sex"
                    name="sex"
                    className={
                      getIn(touched, "sex") && getIn(errors, "sex")
                        ? "invalid"
                        : ""
                    }
                  >
                    <option value="">не выбрано</option>
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                  </Input>
                </InputComponent>
              </Formfield>
              <Formfield name="date" label="Дата рождения" type="text" required>
                <Input
                  component={DatePickerField}
                  id="date"
                  name="date"
                  value={values.date}
                  className={
                    getIn(touched, "date") && getIn(errors, "date")
                      ? "invalid"
                      : ""
                  }
                ></Input>
              </Formfield>
              <Formfield
                name="citizenship"
                label="Гражданство"
                type="text"
                required
              >
                <InputComponent name="sex">
                  <Input
                    component="select"
                    id="citizenship"
                    name="citizenship"
                    className={
                      getIn(touched, "citizenship") &&
                      getIn(errors, "citizenship")
                        ? "invalid"
                        : ""
                    }
                  >
                    <option value="AU">Австралия</option>
                    <option value="AT">Австрия</option>
                    <option value="AZ">Азербайджан</option>
                    <option value="AX">Аландские о-ва</option>
                    <option value="AL">Албания</option>
                    <option value="DZ">Алжир</option>
                    <option value="AS">Американское Самоа</option>
                    <option value="AI">Ангилья</option>
                    <option value="AO">Ангола</option>
                    <option value="AD">Андорра</option>
                    <option value="AQ">Антарктида</option>
                    <option value="AG">Антигуа и Барбуда</option>
                    <option value="AR">Аргентина</option>
                    <option value="AM">Армения</option>
                    <option value="AW">Аруба</option>
                    <option value="AF">Афганистан</option>
                    <option value="BS">Багамы</option>
                    <option value="BD">Бангладеш</option>
                    <option value="BB">Барбадос</option>
                    <option value="BH">Бахрейн</option>
                    <option value="BY">Беларусь</option>
                    <option value="BZ">Белиз</option>
                    <option value="BE">Бельгия</option>
                    <option value="BJ">Бенин</option>
                    <option value="BM">Бермудские о-ва</option>
                    <option value="BG">Болгария</option>
                    <option value="BO">Боливия</option>
                    <option value="BQ">Бонэйр, Синт-Эстатиус и Саба</option>
                    <option value="BA">Босния и Герцеговина</option>
                    <option value="BW">Ботсвана</option>
                    <option value="BR">Бразилия</option>
                    <option value="IO">
                      Британская территория в Индийском океане
                    </option>
                    <option value="BN">Бруней-Даруссалам</option>
                    <option value="BF">Буркина-Фасо</option>
                    <option value="BI">Бурунди</option>
                    <option value="BT">Бутан</option>
                    <option value="VU">Вануату</option>
                    <option value="VA">Ватикан</option>
                    <option value="GB">Великобритания</option>
                    <option value="HU">Венгрия</option>
                    <option value="VE">Венесуэла</option>
                    <option value="VG">Виргинские о-ва (Великобритания)</option>
                    <option value="VI">Виргинские о-ва (США)</option>
                    <option value="UM">Внешние малые о-ва (США)</option>
                    <option value="TL">Восточный Тимор</option>
                    <option value="VN">Вьетнам</option>
                    <option value="GA">Габон</option>
                    <option value="HT">Гаити</option>
                    <option value="GY">Гайана</option>
                    <option value="GM">Гамбия</option>
                    <option value="GH">Гана</option>
                    <option value="GP">Гваделупа</option>
                    <option value="GT">Гватемала</option>
                    <option value="GN">Гвинея</option>
                    <option value="GW">Гвинея-Бисау</option>
                    <option value="DE">Германия</option>
                    <option value="GG">Гернси</option>
                    <option value="GI">Гибралтар</option>
                    <option value="HN">Гондурас</option>
                    <option value="HK">Гонконг (САР)</option>
                    <option value="GD">Гренада</option>
                    <option value="GL">Гренландия</option>
                    <option value="GR">Греция</option>
                    <option value="GE">Грузия</option>
                    <option value="GU">Гуам</option>
                    <option value="DK">Дания</option>
                    <option value="JE">Джерси</option>
                    <option value="DJ">Джибути</option>
                    <option value="DM">Доминика</option>
                    <option value="DO">Доминиканская Республика</option>
                    <option value="EG">Египет</option>
                    <option value="ZM">Замбия</option>
                    <option value="EH">Западная Сахара</option>
                    <option value="ZW">Зимбабве</option>
                    <option value="IL">Израиль</option>
                    <option value="IN">Индия</option>
                    <option value="ID">Индонезия</option>
                    <option value="JO">Иордания</option>
                    <option value="IQ">Ирак</option>
                    <option value="IR">Иран</option>
                    <option value="IE">Ирландия</option>
                    <option value="IS">Исландия</option>
                    <option value="ES">Испания</option>
                    <option value="IT">Италия</option>
                    <option value="YE">Йемен</option>
                    <option value="CV">Кабо-Верде</option>
                    <option value="KZ">Казахстан</option>
                    <option value="KH">Камбоджа</option>
                    <option value="CM">Камерун</option>
                    <option value="CA">Канада</option>
                    <option value="QA">Катар</option>
                    <option value="KE">Кения</option>
                    <option value="CY">Кипр</option>
                    <option value="KG">Киргизия</option>
                    <option value="KI">Кирибати</option>
                    <option value="CN">Китай</option>
                    <option value="KP">КНДР</option>
                    <option value="CC">Кокосовые о-ва</option>
                    <option value="CO">Колумбия</option>
                    <option value="KM">Коморы</option>
                    <option value="CG">Конго - Браззавиль</option>
                    <option value="CD">Конго - Киншаса</option>
                    <option value="CR">Коста-Рика</option>
                    <option value="CI">Кот-д&rsquo;Ивуар</option>
                    <option value="CU">Куба</option>
                    <option value="KW">Кувейт</option>
                    <option value="CW">Кюрасао</option>
                    <option value="LA">Лаос</option>
                    <option value="LV">Латвия</option>
                    <option value="LS">Лесото</option>
                    <option value="LR">Либерия</option>
                    <option value="LB">Ливан</option>
                    <option value="LY">Ливия</option>
                    <option value="LT">Литва</option>
                    <option value="LI">Лихтенштейн</option>
                    <option value="LU">Люксембург</option>
                    <option value="MU">Маврикий</option>
                    <option value="MR">Мавритания</option>
                    <option value="MG">Мадагаскар</option>
                    <option value="YT">Майотта</option>
                    <option value="MO">Макао (САР)</option>
                    <option value="MW">Малави</option>
                    <option value="MY">Малайзия</option>
                    <option value="ML">Мали</option>
                    <option value="MV">Мальдивы</option>
                    <option value="MT">Мальта</option>
                    <option value="MA">Марокко</option>
                    <option value="MQ">Мартиника</option>
                    <option value="MH">Маршалловы Острова</option>
                    <option value="MX">Мексика</option>
                    <option value="MZ">Мозамбик</option>
                    <option value="MD">Молдова</option>
                    <option value="MC">Монако</option>
                    <option value="MN">Монголия</option>
                    <option value="MS">Монтсеррат</option>
                    <option value="MM">Мьянма (Бирма)</option>
                    <option value="NA">Намибия</option>
                    <option value="NR">Науру</option>
                    <option value="NP">Непал</option>
                    <option value="NE">Нигер</option>
                    <option value="NG">Нигерия</option>
                    <option value="NL">Нидерланды</option>
                    <option value="NI">Никарагуа</option>
                    <option value="NU">Ниуэ</option>
                    <option value="NZ">Новая Зеландия</option>
                    <option value="NC">Новая Каледония</option>
                    <option value="NO">Норвегия</option>
                    <option value="BV">о-в Буве</option>
                    <option value="IM">о-в Мэн</option>
                    <option value="NF">о-в Норфолк</option>
                    <option value="CX">о-в Рождества</option>
                    <option value="SH">о-в Св. Елены</option>
                    <option value="PN">о-ва Питкэрн</option>
                    <option value="TC">о-ва Тёркс и Кайкос</option>
                    <option value="HM">о-ва Херд и Макдональд</option>
                    <option value="AE">ОАЭ</option>
                    <option value="OM">Оман</option>
                    <option value="KY">Острова Кайман</option>
                    <option value="CK">Острова Кука</option>
                    <option value="PK">Пакистан</option>
                    <option value="PW">Палау</option>
                    <option value="PS">Палестинские территории</option>
                    <option value="PA">Панама</option>
                    <option value="PG">Папуа &mdash; Новая Гвинея</option>
                    <option value="PY">Парагвай</option>
                    <option value="PE">Перу</option>
                    <option value="PL">Польша</option>
                    <option value="PT">Португалия</option>
                    <option value="PR">Пуэрто-Рико</option>
                    <option value="KR">Республика Корея</option>
                    <option value="RE">Реюньон</option>
                    <option value="RU">Россия</option>
                    <option value="RW">Руанда</option>
                    <option value="RO">Румыния</option>
                    <option value="SV">Сальвадор</option>
                    <option value="WS">Самоа</option>
                    <option value="SM">Сан-Марино</option>
                    <option value="ST">Сан-Томе и Принсипи</option>
                    <option value="SA">Саудовская Аравия</option>
                    <option value="MK">Северная Македония</option>
                    <option value="MP">Северные Марианские о-ва</option>
                    <option value="SC">Сейшельские Острова</option>
                    <option value="BL">Сен-Бартелеми</option>
                    <option value="MF">Сен-Мартен</option>
                    <option value="PM">Сен-Пьер и Микелон</option>
                    <option value="SN">Сенегал</option>
                    <option value="VC">Сент-Винсент и Гренадины</option>
                    <option value="KN">Сент-Китс и Невис</option>
                    <option value="LC">Сент-Люсия</option>
                    <option value="RS">Сербия</option>
                    <option value="SG">Сингапур</option>
                    <option value="SX">Синт-Мартен</option>
                    <option value="SY">Сирия</option>
                    <option value="SK">Словакия</option>
                    <option value="SI">Словения</option>
                    <option value="US">Соединенные Штаты</option>
                    <option value="SB">Соломоновы Острова</option>
                    <option value="SO">Сомали</option>
                    <option value="SD">Судан</option>
                    <option value="SR">Суринам</option>
                    <option value="SL">Сьерра-Леоне</option>
                    <option value="TJ">Таджикистан</option>
                    <option value="TH">Таиланд</option>
                    <option value="TW">Тайвань</option>
                    <option value="TZ">Танзания</option>
                    <option value="TG">Того</option>
                    <option value="TK">Токелау</option>
                    <option value="TO">Тонга</option>
                    <option value="TT">Тринидад и Тобаго</option>
                    <option value="TV">Тувалу</option>
                    <option value="TN">Тунис</option>
                    <option value="TM">Туркменистан</option>
                    <option value="TR">Турция</option>
                    <option value="UG">Уганда</option>
                    <option value="UZ">Узбекистан</option>
                    <option value="UA">Украина</option>
                    <option value="WF">Уоллис и Футуна</option>
                    <option value="UY">Уругвай</option>
                    <option value="FO">Фарерские о-ва</option>
                    <option value="FM">Федеративные Штаты Микронезии</option>
                    <option value="FJ">Фиджи</option>
                    <option value="PH">Филиппины</option>
                    <option value="FI">Финляндия</option>
                    <option value="FK">Фолклендские о-ва</option>
                    <option value="FR">Франция</option>
                    <option value="GF">Французская Гвиана</option>
                    <option value="PF">Французская Полинезия</option>
                    <option value="TF">Французские Южные территории</option>
                    <option value="HR">Хорватия</option>
                    <option value="CF">
                      Центрально-Африканская Республика
                    </option>
                    <option value="TD">Чад</option>
                    <option value="ME">Черногория</option>
                    <option value="CZ">Чехия</option>
                    <option value="CL">Чили</option>
                    <option value="CH">Швейцария</option>
                    <option value="SE">Швеция</option>
                    <option value="SJ">Шпицберген и Ян-Майен</option>
                    <option value="LK">Шри-Ланка</option>
                    <option value="EC">Эквадор</option>
                    <option value="GQ">Экваториальная Гвинея</option>
                    <option value="ER">Эритрея</option>
                    <option value="SZ">Эсватини</option>
                    <option value="EE">Эстония</option>
                    <option value="ET">Эфиопия</option>
                    <option value="GS">
                      Южная Георгия и Южные Сандвичевы о-ва
                    </option>
                    <option value="ZA">Южно-Африканская Республика</option>
                    <option value="SS">Южный Судан</option>
                    <option value="JM">Ямайка</option>
                    <option value="JP">Япония</option>
                  </Input>
                </InputComponent>
              </Formfield>
              <Formfield
                name="docType"
                label="Тип документа"
                required
                labelTextOrNode={
                  <>
                    <strong>Аббревиатуры типов документов:</strong>
                    <ul>
                      <li>
                        <strong>ПН</strong> - Паспорт РФ
                      </li>
                      <li>
                        <strong>ПС</strong> - Паспорт формы СССР
                      </li>
                      <li>
                        <strong>ЗП</strong> - Заграничный паспорт
                      </li>
                      <li>
                        <strong>ЗЗ</strong> - Иностранный документ
                      </li>
                      <li>
                        <strong>ПМ</strong> - Удостоверение личности моряка
                      </li>
                      <li>
                        <strong>СР</strong> - Свидетельство о рождении
                      </li>
                      <li>
                        <strong>ВБ</strong> - Военный билет военнослужащих
                        срочной службы, по контракту и курсантов
                      </li>
                      <li>
                        <strong>ВЖ</strong> - Вид на жительство
                      </li>
                      <li>
                        <strong>МС</strong> - Медицинское свидетельство о
                        рождении
                      </li>
                    </ul>
                  </>
                }
                type="text"
              >
                <InputComponent name="docType">
                  <Input
                    component="select"
                    id="docType"
                    name="docType"
                    className={
                      getIn(touched, "docType") && getIn(errors, "docType")
                        ? "invalid"
                        : ""
                    }
                  >
                    <option value="0">не выбрано</option>
                    <option value="1">Паспорт РФ</option>
                    <option value="2">Паспорт формы СССР</option>
                    <option value="3">Заграничный паспорт</option>
                    <option value="4">Иностранный документ</option>
                    <option value="5">Удостоверение личности моряка</option>
                    <option value="6">Свидетельство о рождении</option>
                    <option value="7">
                      Военный билет военнослужащих срочной службы, по контракту
                      и курсантов
                    </option>
                    <option value="11">Вид на жительство</option>
                  </Input>
                </InputComponent>
              </Formfield>
              <Formfield
                name="docNum"
                label="Номер документа"
                required
                labelTextOrNode={
                  <>
                    <p>
                      <strong>
                        Формат ввода номера российского паспорта нового образца:
                      </strong>
                    </p>
                    <ul>
                      <li>
                        Серия: четыре цифры, номер: шесть цифр. Количество
                        пробелов не имеет значения.{" "}
                      </li>
                    </ul>
                    <p>
                      При заполнении номера документа, удостоверяющего личность,
                      символ «№» не указывается. Данные паспорта или
                      свидетельства о рождении, выданного гражданам иностранных
                      государств, вводятся с заданием типа документа -
                      иностранный документ.
                    </p>
                  </>
                }
                type="text"
              >
                <MaskedInput
                  id="donNum"
                  name="docNum"
                  mask={inputMasksMap.docNum}
                  value={values.docNum}
                  alwaysShowMask
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Formfield>
              <Formfield name="tarif" label="Тариф" type="text" required>
                <InputComponent name="tarif">
                  <Input
                    component="select"
                    id="tarif"
                    name="tarif"
                    className={
                      getIn(touched, "tarif") && getIn(errors, "tarif")
                        ? "invalid"
                        : ""
                    }
                  >
                    <option value="">не выбрано</option>
                    <option value="1">Детский</option>
                    <option value="2">Полный</option>
                  </Input>
                </InputComponent>
              </Formfield>
            </Fieldset>
            <Fieldset mb={3}>
              <InputComponent name="agreement">
                <label>
                  <Checkbox
                    checked={values.agreement}
                    onChange={() =>
                      setFieldValue("agreement", !values.agreement)
                    }
                    name="agreement"
                    labelWrap={false}
                    disabled={true}
                  />
                  <Span ml={2} fontWeight="bold">
                    Согласен на получение оповещений в случаях чрезвычайных
                    ситуаций на железнодорожном транспорте
                  </Span>
                </label>
              </InputComponent>
            </Fieldset>
            <P>
              В соответствии с п.7 Правил перевозок пассажиров, багажа,
              грузобагажа железнодорожным транспортом при покупке билета
              необходимо указать свои контактные данные.
            </P>
            <Fieldset
              display="grid"
              gridColumnGap={4}
              gridTemplateColumns="repeat(3, 1fr)"
              mb={3}
            >
              <Formfield name="tel" label="Телефон" type="text" required>
                <MaskedInput
                  id="tel"
                  name="tel"
                  mask={inputMasksMap.tel}
                  value={values.tel}
                  alwaysShowMask
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Formfield>
              <Formfield
                name="email"
                label="Email"
                type="text"
                required
              ></Formfield>
            </Fieldset>
            <PrimaryButton
              type="submit"
              disabled={!dirty || isSubmitting || !isValid}
              onClick={() => setSubmitting(true)}
              alignSelf="flex-end"
            >
              Зарезервировать места
            </PrimaryButton>
          </FormComponent>
        )}
      </Formik>
    </>
  );
};

export default Form;
