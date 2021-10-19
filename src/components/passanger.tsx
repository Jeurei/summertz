import React from "react";
import { getIn, useFormikContext } from "formik";
import { Fieldset, Input, P, Span } from "../styled-components";
import Checkbox from "./checkbox";
import InputComponent from "./Input";
import Formfield from "./formField";
import DatePickerField from "./datepickerField";
import { inputMasksMap } from "../constants/constans";
import MaskedInput from "./maskedInput";
import { FormInitialValues } from "./form";
import { calculateAge } from "../utls/calculateAge";
import { isEmpty } from "../utls/isEmpty";

interface PassangerProps {
  id: number;
}

const Passanger: React.FC<PassangerProps> = ({ id }) => {
  const CHILDREN_AGE_MAX = 10;

  const { setFieldValue, values, touched, handleChange, handleBlur, errors } =
    useFormikContext<FormInitialValues>();

  const isInvalid = (name: string) => {
    return !!(getIn(touched, name) && getIn(errors, name));
  };

  const isValid = (name: string) => {
    if (!getIn(touched, name)) {
      return true;
    }

    return !!getIn(errors, name);
  };

  const isTarifDisabled = () => {
    if (isEmpty(touched)) {
      return true;
    }

    return (
      isValid(`passangers[${id}].name`) ||
      isValid(`passangers[${id}].surname`) ||
      isValid(`passangers[${id}].fathersName`) ||
      isValid(`passangers[${id}].sex`) ||
      isValid(`passangers[${id}].date`)
    );
  };

  const isChild = () =>
    getIn(values, `passangers[${id}.date]`) &&
    calculateAge(getIn(values, `passangers[${id}.date]`)) <= CHILDREN_AGE_MAX;

  return (
    <>
      <Fieldset mb={3}>
        <InputComponent name="fss">
          <label>
            <Checkbox
              checked={getIn(values, `passangers[${id}].fss`)}
              onChange={() =>
                setFieldValue(`passangers[${id}].fss`, !values.fss)
              }
              name={`passangers[${id}].fss`}
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
        gridTemplateColumns={{
          sm: "repeat(auto-fit, minmax(285px, 1fr))",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        mb={3}
      >
        <Formfield
          labelTextOrNode="Идентификационный номер инвалида, выданный в Центре содействия мобильности."
          label="СНИЛС или номер регистрации ЦСМ"
          name={`passangers[${id}].snils`}
          type="text"
        >
          <MaskedInput
            id={`passangers[${id}].snils`}
            name={`passangers[${id}].snils`}
            mask={inputMasksMap.snils}
            value={getIn(values, `passangers[${id}].snils`)}
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
        gridTemplateColumns="repeat(auto-fit, minmax(284px, 1fr))"
        mb={3}
      >
        <Formfield
          name={`passangers[${id}].surname`}
          label="Фамилия"
          type="text"
          required
        ></Formfield>
        <Formfield
          name={`passangers[${id}].name`}
          label="Имя"
          type="text"
          required
        ></Formfield>
        <Formfield
          name={`passangers[${id}].fathersName`}
          label="Отчество (обязательно при наличии)"
          type="text"
          labelTextOrNode="Если в документе удостоверяющем личность у Вас нет отчества, поставьте в поле дефис (символ ' - ')."
          required
        ></Formfield>
        <Formfield
          name={`passangers[${id}].sex`}
          label="Пол"
          type="text"
          required
        >
          <InputComponent name={`passangers[${id}].sex`}>
            <Input
              component="select"
              id={`passangers[${id}].sex`}
              name={`passangers[${id}].sex`}
              className={isInvalid(`passangers[${id}].sex`) ? "invalid" : ""}
            >
              <option value="">не выбрано</option>
              <option value="1">Мужской</option>
              <option value="2">Женский</option>
            </Input>
          </InputComponent>
        </Formfield>
        <Formfield
          name={`passangers[${id}].date`}
          label="Дата рождения"
          type="text"
          required
        >
          <Input
            component={DatePickerField}
            id={`passangers[${id}].date`}
            name={`passangers[${id}].date`}
            value={values.date}
            className={isInvalid(`passangers[${id}].date`) ? "invalid" : ""}
          ></Input>
        </Formfield>
        <Formfield
          name={`passangers[${id}].citezenship`}
          label="Гражданство"
          type="text"
          required
        >
          <InputComponent name={`passangers[${id}].citezenship`}>
            <Input
              component="select"
              id={`passangers[${id}].citezenship`}
              name={`passangers[${id}].citezenship`}
              className={
                isInvalid(`passangers[${id}].citezenship`) ? "invalid" : ""
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
              <option value="CF">Центрально-Африканская Республика</option>
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
              <option value="GS">Южная Георгия и Южные Сандвичевы о-ва</option>
              <option value="ZA">Южно-Африканская Республика</option>
              <option value="SS">Южный Судан</option>
              <option value="JM">Ямайка</option>
              <option value="JP">Япония</option>
            </Input>
          </InputComponent>
        </Formfield>
        <Formfield
          name={`passangers[${id}].docType`}
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
                  <strong>ВБ</strong> - Военный билет военнослужащих срочной
                  службы, по контракту и курсантов
                </li>
                <li>
                  <strong>ВЖ</strong> - Вид на жительство
                </li>
                <li>
                  <strong>МС</strong> - Медицинское свидетельство о рождении
                </li>
              </ul>
            </>
          }
          type="text"
        >
          <InputComponent name={`passangers[${id}].docType`}>
            <Input
              component="select"
              id={`passangers[${id}].docType`}
              name={`passangers[${id}].docType`}
              className={
                isInvalid(`passangers[${id}].docType`) ? "invalid" : ""
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
                Военный билет военнослужащих срочной службы, по контракту и
                курсантов
              </option>
              <option value="11">Вид на жительство</option>
            </Input>
          </InputComponent>
        </Formfield>
        <Formfield
          name={`passangers[${id}].docNum`}
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
                  Серия: четыре цифры, номер: шесть цифр. Количество пробелов не
                  имеет значения.{" "}
                </li>
              </ul>
              <p>
                При заполнении номера документа, удостоверяющего личность,
                символ «№» не указывается. Данные паспорта или свидетельства о
                рождении, выданного гражданам иностранных государств, вводятся с
                заданием типа документа - иностранный документ.
              </p>
            </>
          }
          type="text"
        >
          <MaskedInput
            id={`passangers[${id}].docNum`}
            name={`passangers[${id}].docNum`}
            mask={inputMasksMap.docNum}
            value={getIn(values, `passangers[${id}].docNum`)}
            alwaysShowMask
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Formfield>
        <Formfield
          name={`passangers[${id}].tarif`}
          label="Тариф"
          type="text"
          required
        >
          <InputComponent name={`passangers[${id}].tarif`}>
            <Input
              component="select"
              id={`passangers[${id}].tarif`}
              name={`passangers[${id}].tarif`}
              className={isInvalid(`passangers[${id}].tarif`) ? "invalid" : ""}
              disabled={isTarifDisabled()}
            >
              <option value="">не выбрано</option>
              {isChild() && <option value="1">Детский</option>}
              <option value="2">Полный</option>
            </Input>
          </InputComponent>
        </Formfield>
      </Fieldset>
      <Fieldset mb={3}>
        <InputComponent name={`passangers[${id}].agreement`}>
          <label>
            <Checkbox
              checked={getIn(values, `passangers[${id}].agreement`)}
              onChange={() =>
                setFieldValue(`passangers[${id}].agreement`, !values.agreement)
              }
              name={`passangers[${id}].agreement`}
              labelWrap={false}
              disabled={true}
            />
            <Span ml={2} fontWeight="bold">
              Согласен на получение оповещений в случаях чрезвычайных ситуаций
              на железнодорожном транспорте
            </Span>
          </label>
        </InputComponent>
      </Fieldset>
      <P>
        В соответствии с п.7 Правил перевозок пассажиров, багажа, грузобагажа
        железнодорожным транспортом при покупке билета необходимо указать свои
        контактные данные.
      </P>
      <Fieldset
        display="grid"
        gridColumnGap={4}
        gridRowGap={3}
        gridTemplateColumns={{
          sm: "repeat(auto-fit, minmax(284px, 1fr))",
          lg: "repeat(3, 1fr)",
        }}
        mb={3}
      >
        <Formfield
          name={`passangers[${id}].tel`}
          label="Телефон"
          type="text"
          required
        >
          <MaskedInput
            id={`passangers[${id}].tel`}
            name={`passangers[${id}].tel`}
            mask={inputMasksMap.tel}
            value={getIn(values, `passangers[${id}].tel`)}
            alwaysShowMask
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Formfield>
        <Formfield
          name={`passangers[${id}].email`}
          label="Email"
          type="text"
          required
        ></Formfield>
      </Fieldset>
    </>
  );
};

export default Passanger;
