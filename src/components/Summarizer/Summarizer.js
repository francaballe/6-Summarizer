import { Button, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
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

  function summarizeHandler() {    
    setIsLoading(true);
    fetchData();
  }

  function textHandler(event) {
    setText(event.target.value);
  }

  function languageChangeHandler(event) {
    setSelectedLanguage(prevSelectedLanguage => event.target.value);
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
        { role: 'user', content: `Summarize the following text in ${selectedLanguage}: ${text}` },
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

  return (
    <Box
      sx={{
        width: '100vw',
        margin: '0 auto',
        padding: '16px',
      }}
    >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            label="Summarize"
            placeholder="Enter the text to be summarized"
            multiline
            rows={8}
            required
            sx={{ width: '100%' }}
            onChange={textHandler}
            value={text}
          />
          
          <Button variant="outlined" onClick={clearTextHandler} endIcon={<DeleteIcon/>} sx={{ mt: 1 }}>
            Clear Text
          </Button>
        </Grid>
        <Grid item>
          <RadioGroup value={selectedLanguage} onChange={languageChangeHandler} row>
            <FormControlLabel value="English" control={<Radio />} label="English" />
            <FormControlLabel value="Spanish" control={<Radio />} label="Spanish" />
            <FormControlLabel value="French" control={<Radio />} label="French" />
            <FormControlLabel value="German" control={<Radio />} label="German" />
            <FormControlLabel value="Italian" control={<Radio />} label="Italian" />
          </RadioGroup>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={summarizeHandler} disabled={isLoading}>
            {isLoading ? "Summarizing..." : "Summarize"}
          </Button>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <TextField
            label="Summary"
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
              </Grid>
              </Box>
              );
              }
              
              export default Summarize;