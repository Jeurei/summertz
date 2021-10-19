import React from "react";
import { Div } from "../styled-components";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadProps {
  state?: boolean;
}

const Load: React.FC<LoadProps> = ({ state = false, children }) => {
  return (
    <>
      {state ? (
        <Div display="flex" flexDirection="column" alignItems="center">
          <ClipLoader loading={state} size={100} />
        </Div>
      ) : (
        children
      )}
    </>
  );
};

export default Load;
