import { Field, FieldProps, Form as FormComponent } from "formik";
import styled from "styled-components";
import {
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  color,
  ColorProps,
  typography,
  TypographyProps,
  compose,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
} from "styled-system";
import MaskedInputComponent, {
  Props as MaskInputProps,
} from "react-input-mask";

// #TODO: избавить от магических чисел

enum VARIANT {
  PRIMARY,
  SECONDARY,
}

interface IProps
  extends PositionProps,
    LayoutProps,
    SpaceProps,
    ColorProps,
    TypographyProps,
    FlexboxProps,
    GridProps {
  variant?: VARIANT;
  children: React.ReactNode;
}
// Default tags

export const Wrapper = styled.div<IProps>`
  margin: 0 auto;

  ${({ theme: { up, breakPoints } }) => `
    ${up(breakPoints.sm)}{
      width:  ${breakPoints.sm};
    }

    ${up(breakPoints.md)}{
      width: ${breakPoints.md}
    }

    ${up(breakPoints.lg)}{
      width: ${breakPoints.lg}
    }
  `}
`;

export const Div = styled.div<IProps>`
  ${compose(typography, color, space, layout, position, flexbox, grid)}
`;

export const List = styled.div<IProps>`
  list-style: none;
  padding: 0;
  margin: 0;
  ${compose(typography, color, space, layout, position, flexbox, grid)}
`;

export const Span = styled.span<IProps>`
  ${compose(typography, color, space, layout, position, flexbox, grid)}
`;

export const Heading = styled.h1<IProps>`
  margin: 0;
  ${compose(typography, color, space, layout)}
`;

export const P = styled.p`
  padding: 0;
  margin-bottom: 16px;
`;

// Form

export const Form = styled(FormComponent)<IProps>`
  ${compose(typography, color, space, layout, position, flexbox, grid)}
`;

export const Fieldset = styled.fieldset<IProps>`
  border: 0;
  padding: 0;
  margin: 0;
  ${compose(typography, color, space, layout, position, flexbox, grid)}
`;

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

interface ICheckboxProps {
  name: string;
  disabled?: boolean;
}

const hiidenStyles = `border: 0;
clip: rect(0 0 0 0);
height: 1px;
margin: -1px;
overflow: hidden;
padding: 0;
position: absolute;
white-space: nowrap;
width: 1px;`;

export const HiddenCheckbox = styled(Field).attrs<ICheckboxProps>(
  ({ name, disabled = false }) => ({
    type: "checkbox",
    name,
    id: name,
    disabled,
  })
)<ICheckboxProps>`
  ${hiidenStyles}
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

interface IStyledCeckboxProps {
  checked: boolean;
  disabled?: boolean;
}

export const StyledCheckbox = styled.div<IStyledCeckboxProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({
    checked,
    disabled = false,
    theme: {
      colors: { secondary, white, inactive },
    },
  }) => (checked ? (disabled ? inactive : secondary) : white)};
  border-radius: ${({ theme: { radii } }) => radii.md};
  border: 1px solid
    ${({
      checked,
      theme: {
        colors: { black, white },
      },
    }) => (checked ? white : black)};
  transition: all 150ms;

  ${Icon} {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
  }
`;

export const Hint = styled.span`
  display: none;
  width: 300px;
  height: auto;
  position: absolute;
  bottom: 20px;
  color: #000;
  border: 1px solid #444;
  padding: 6px 10px 4px;
  line-height: 1.4;
  font-weight: normal;
  font-size: 12px;
  background-color: #fff;
  border-radius: 4px;
  z-index: 10;
  left: 0;
  box-shadow: 2px 2px 5px #555;
`;

export const Label = styled.label<IProps>`
  font-weight: ${({
    theme: {
      fontWeights: { bold },
    },
  }) => bold};
  ${space};
`;

export const LabelStar = styled.span`
  position: absolute;
  right: -16px;
  top: 1px;
  color: #e21a1a;
`;

export const LabelWithHint = styled(Label)<IProps>`
  border-bottom: 1px dotted;
  cursor: help;
  position: relative;

  &:hover {
    ${Hint} {
      display: block;
    }
  }
`;

const inputStyles = `
display: block;
width: 100%;
min-height: 34px;
max-height: 34px;
padding: 6px 6px;
font-size: 14px;
line-height: 1.42857143;
color: #555;
background-color: #fff;
background-image: none;
border: 1px solid #ccc;
border-top-color: rgb(204, 204, 204);
border-right-color: rgb(204, 204, 204);
border-bottom-color: rgb(204, 204, 204);
border-left-color: rgb(204, 204, 204);
border-radius: 6px;
transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

&.invalid {
  background: #fff2f1;
  outline: transparent;
  border-color: #e21a1a;
}`;

interface IInputProps {
  type: string;
  placeholder: string;
  name: string;
  className: string;
  component?: string;
  render?: (props: FieldProps) => React.ReactNode;
  disabled?: boolean;
}

export const InputError = styled.span`
  color: #e21a1a;
  height: auto;
  min-height: 1em;
  position: absolute;
  bottom: -15px;
  left: 0;
`;

export const Input = styled(Field).attrs<IInputProps>(
  ({
    type = "text",
    placeholder = "",
    name,
    className,
    component = "input",
    render,
    disabled = false,
  }) => ({
    type,
    placeholder,
    name,
    className,
    component,
    render,
    disabled,
  })
)<ICheckboxProps>`
  ${inputStyles}

  &:disabled {
    background-color: ${({
      theme: {
        colors: { inactive },
      },
    }) => inactive};
    opacity: 0.4;
  }
`;

export const MaskedInput = styled(MaskedInputComponent).attrs<MaskInputProps>(
  ({ id, name, mask, onChange, onBlur, className, alwaysShowMask, value }) => ({
    id,
    name,
    mask,
    onChange,
    onBlur,
    className,
    alwaysShowMask,
    value,
  })
)<MaskInputProps>`
  ${inputStyles}
`;

export const Button = styled.button.attrs<IProps>(({ type, onClick }) => ({
  type,
  onClick,
}))<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  padding-right: 12px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.42857143;
  border-radius: 4px;
  appearance: none;
  border: none;
  ${compose(typography, color, space, layout, position, flexbox, grid)}

  &:disabled {
    color: ${({
      theme: {
        colors: { inactive },
      },
    }) => inactive};
  }

  ${({ theme: { down, breakPoints, colors } }) => `
    ${down(breakPoints.md)}{
      background-color: ${colors.secondary};
      margin-bottom: 15px;
      color: ${colors.white};

      svg {
        display:none;
      }

      &:disabled{
        background-color: ${colors.inactive};
        color: ${colors.black};
      }
    }
  `}

  &.close-button {
    svg {
      display: block;
    }

    background-color: ${({ theme: { colors } }) => colors.inactive};
    color: ${({ theme: { colors } }) => colors.black};
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${({ theme: { colors } }) => colors.secondary};
      color: ${({ theme: { colors } }) => colors.white};
    }
  }
`;

export const PrimaryButton = styled(Button).attrs<IProps>(
  ({ type, onClick }) => ({
    type,
    onClick,
  })
)<IProps>`
  color: ${({
    theme: {
      colors: { black },
    },
  }) => black} !important;

  &:not(:disabled) {
    background-color: ${({
      theme: {
        colors: { secondary },
      },
    }) => secondary};
    color: ${({
      theme: {
        colors: { white },
      },
    }) => white} !important;
  }

  ${compose(typography, color, space, layout, position, flexbox, grid)}
`;

export const SecondaryButton = styled(Button).attrs<IProps>(
  ({ type, onClick }) => ({
    type,
    onClick,
  })
)`
  color: #666 !important;
  border: 1px solid #b3b3b3;
  background: #fefefe;
  background: linear-gradient(to bottom, #fefefe 0, #e9e9e9 100%);

  &:hover {
    background: #e9e9e9;
  }

  ${compose(typography, color, space, layout, position, flexbox, grid)}
`;

export const Diadlog = styled(Div)<IProps>`
  content: "";
  position: fixed;
  min-width: 100vw;
  min-height: 100vh;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const InfoPopup = styled(Div)<IProps>`
  top: 20%;
  left: 50%;
  background-color: ${({
    theme: {
      colors: { white },
    },
  }) => white};
  width: 60%;
  height: 300px;
  position: absolute;
  transform: translate(-50%);
  padding: 10px;
  display: flex;
  flex-direction: column;

  ${compose(typography, color, space, layout, position, flexbox, grid)}
`;
