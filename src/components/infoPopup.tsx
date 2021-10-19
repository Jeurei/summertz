import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import {
  Button,
  Div,
  InfoPopup as InfoPopupComponents,
  Span,
} from "../styled-components";
import Load from "./load";

interface InfoPopupProps {
  closeHanlder: () => void;
  request: () => Promise<any>;
  errorMessage: string;
}

const InfoPopup: React.FC<InfoPopupProps> = ({
  children,
  closeHanlder,
  request,
  errorMessage,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSucceses] = useState<boolean | null>(null);
  const { resetForm } = useFormikContext();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        // здесь хотел сделать обработку ошибки через error message но апи возвращает undefined
        const res = await request();
        setSucceses(true);
      } catch (e) {
        setSucceses(false);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <InfoPopupComponents>
      <Button
        alignSelf="flex-end"
        className="close-button"
        onClick={() => {
          closeHanlder();
          resetForm();
        }}
      >
        <svg className="close" width="15" height="15" viewBox="0 0 352 512">
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          />
        </svg>
      </Button>
      <Load state={isLoading}>
        <Div
          display="flex"
          justifyContent="center"
          align-items="center"
          height="100%"
        >
          {isSuccess ? (
            children
          ) : (
            <Span display="flex" alignItems="center" fontSize="30px">
              {errorMessage}
            </Span>
          )}
        </Div>
      </Load>
    </InfoPopupComponents>
  );
};

export default InfoPopup;
