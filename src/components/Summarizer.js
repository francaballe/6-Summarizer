import { Button, FormControlLabel, Grid, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from "axios";
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

const apiKey = process.env.REACT_APP_OPENAI_APIKEY;

function Summarize() {
  const [text, setText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizeEnabled, setIsSummarizeEnabled] = useState(false);

  function summarizeHandler() {    
    setIsLoading(true);
    fetchData();
  }

  function textHandler(event) {
    setText(event.target.value);
  }

  function languageChangeHandler(event) {
    setSelectedLanguage(event.target.value);
  }

  function clearTextHandler() {
    setText("");
  }

  async function fetchData() {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
  
    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        //{ role: 'user', content: `Summarize the following text in ${selectedLanguage}: ${text}` },
        { role: 'user', content: `${isSummarizeEnabled ? "Summarize" : "Translate"} the following text in ${selectedLanguage}: ${text}` },
      ],
      temperature: 0.7,
    };

    axios.post('https://api.openai.com/v1/chat/completions', requestData, { headers })
      .then(response => {
        setSummarizedText(response.data.choices[0].message.content);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(summarizedText);
  }

  function toggleSummarize() {
    setIsSummarizeEnabled(prevState => !prevState);
  }

  return (
    <Box
      sx={{
        width: '100vw',
        margin: '0 auto',
        padding: '16px',
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item sx={{ width: '90%' }}>
          <TextField
            label={isSummarizeEnabled ? "Summarize & Translate" : "Only Translate"}
            placeholder={isSummarizeEnabled ? "Enter the text to be summarized & translated" : "Enter the text to be translated"}
            multiline
            rows={8}            
            sx={{ width: '100%' }}
            onChange={textHandler}
            value={text}
          />
          
          <Button variant="outlined" onClick={clearTextHandler} endIcon={<DeleteIcon/>} sx={{ mt: 1 }}>
            Clear Text
          </Button>
        </Grid>
        <Grid item>
          <Switch checked={isSummarizeEnabled} onChange={toggleSummarize} />
          {isSummarizeEnabled ? <span> Summarize & Translate</span> : <span> Only Translate</span>}
        </Grid>
        <Grid item>
          <RadioGroup value={selectedLanguage} onChange={languageChangeHandler} row>
            <FormControlLabel value="English" control={<Radio />} label="English" />
            <FormControlLabel value="Spanish" control={<Radio />} label="Spanish" />
            <FormControlLabel value="French" control={<Radio />} label="French" />
            <FormControlLabel value="German" control={<Radio />} label
="German" />
<FormControlLabel value="Italian" control={<Radio />} label="Italian" />
</RadioGroup>
</Grid>
<Grid item>
<Button variant="contained" onClick={summarizeHandler} disabled={isLoading}>
  {isLoading ? 
    isSummarizeEnabled ?
      "Summarizing & Translating..."
      :
      "Translating..."  
  :
    isSummarizeEnabled ?
      "Summarize & Translate"
      :
      "Translate"     
  }
      

</Button>
</Grid>
<Grid item sx={{ width: '90%' }}>
<TextField
label={isSummarizeEnabled ? "Summary & Translation" : "Translation"}
multiline
rows={8}
InputProps={{
readOnly: true,
}}
value={summarizedText}
sx={{
width: '100%' }}
/>
<Button variant="outlined" onClick={copyToClipboard} endIcon={<ContentPasteIcon/>} sx={{ mt: 1 }}>
Copy to Clipboard
</Button>
</Grid>
<Grid container justifyContent="center" item sx={{ width: '100%' }}>
<img src="openai-logo.png" alt="Powered by OpenAI" />
</Grid>
</Grid>
</Box>
);
}

export default Summarize;