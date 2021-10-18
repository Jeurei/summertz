import React from "react";
import { ThemeProvider } from "styled-components";
import Form from "./components/form";
import { Wrapper } from "./styled-components";
import { theme } from "./theme";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Form />
        </Wrapper>
      </ThemeProvider>
    </div>
  );
}

export default App;
