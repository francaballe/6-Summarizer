import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import Summarizer from "../src/components/Summarizer/Summarizer.js";


function App() {

  const theme = createTheme();

  return (
    <div className="App">

    <ThemeProvider theme={theme}>
 
    <Routes>
          <Route path="/" element={<Summarizer/>}></Route>                
    </Routes>

    </ThemeProvider>
    </div>      
  );
}

export default App;
