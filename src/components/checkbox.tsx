import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from "../styled-components";

interface ICheckBoxProps {
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelWrap?: boolean;
  disabled?: boolean;
}

const Checkbox: React.FC<ICheckBoxProps> = ({
  name,
  checked,
  labelWrap = true,
  disabled = false,
  ...props
}) => {
  const content = (
    <CheckboxContainer>
      <HiddenCheckbox
        name={name}
        checked={checked}
        {...props}
        disabled={disabled}
      />
      <StyledCheckbox checked={checked} disabled={disabled}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );

  return labelWrap ? <label>{content}</label> : <>{content}</>;
};

export default Checkbox;
