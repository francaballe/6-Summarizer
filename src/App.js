import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import Summarizer from "../src/components/Summarizer.js";


function App() {

  const theme = createTheme();

  return (
    <div className="App">

    <ThemeProvider theme={theme}>    
      <Summarizer/>
    </ThemeProvider>
    </div>      
  );
}

export default App;
