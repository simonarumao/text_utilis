import React, { useState } from 'react';
import CryptoJS from 'crypto-js';


export default function TextForm(props) {

  const [text, setText] = useState("");
  // wrong way to change the shate
  // text = "new state"

  // setText("newtext") : this is the correct way to set the state
  const [key, setKey] = useState("");
  const [encryptedText, setEncryptedText] = useState(false);
  const [extractedEmails, setExtractedEmails] = useState([]);
  const [extractedUrls, setExtractedUrls] = useState([]);

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  }


    const handleUpClick = () => {
    
      let newtext = text.toUpperCase();
      setText(newtext);
  }
  const handleDownClick = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
  }
  const reverseString = () => {
    let newtext = text.split('').reverse().join('')
    setText(newtext);
  }
  const replaceString = () => {
    let newtext = text.replace("simonalover","jonathan")
    setText(newtext);
  }
  const speech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }else {
      alert("Soryry, your browser doesn't support text to speech!");
    }
  }

  const clear = () => {
    let newtext = '';
    let Emails = []
    let url = []
    setText(newtext);
    setExtractedEmails(Emails);
    setExtractedUrls(url);
  }

  const encrypText = () => {
    if (!encryptedText && key)
    {
      const cipherText = CryptoJS.AES.encrypt(text, key).toString();
      setText(cipherText);
      setEncryptedText(true);
      }
  }

  const decrypText = () => {
    if (encryptedText && key) {
      const bytes = CryptoJS.AES.decrypt(text, key);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      setText(originalText);
      setEncryptedText(false);
    }
  }

  const extractEmailsAndUrl = () => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    const emails = text.match(emailRegex) || [];
    const urls = text.match(urlRegex) || [];

    setExtractedEmails(emails);
    setExtractedUrls(urls);


  }

  
 
 
   

  return (
    <>
    <div className="container">
    <div>
        <div className="mb-3">
              <h1>{props.heading}</h1>
            <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
             
          </div>

          <div className="mb-3 ">
          <input type="text" value={key} onChange={handleKeyChange} placeholder='enter encryption key'/>
      
          </div>
         
      <button className="btn btn-primary" onClick={handleUpClick}>Convert to uppercase</button>  
          <button className="btn btn-danger mx-3" onClick={handleDownClick}>Convert to uppercase</button> 
          <button className="btn btn-info mx-3" onClick={reverseString}>Reverse the string</button>   
          <button className="btn btn-info mx-3" onClick={replaceString}>Replace the string</button> 
          <button className="btn btn-info mx-3" onClick={speech}>Speech</button>        
          <button className="btn btn-info mx-3" onClick={clear}>Clear</button> 
          <button className="btn btn-danger mx-3" onClick={encrypText} disabled={encryptedText || !key}>Encrypt The text</button> 
          <button className="btn btn-primary mx-3 my-3" onClick={decrypText} disabled={!encryptedText || !key}>Decrypt The text</button> 
          <button className="btn btn-info mx-3 my-3" onClick={extractEmailsAndUrl}>Extract Emails and urls</button>   




      </div>
      </div>
      <div className="container  my-4">
        <h1>Your Text summary</h1>
        <p>{text.split(" ").length} words and {text.length} characters</p>
        <p>{0.008 * text.length} Minutes Read</p>
        <h2>Preview</h2>
        <p>{text}</p>
        <h2>Extracted Emails:</h2>
        <ul>
          {extractedEmails.map((email) => (
            <li>{email}</li>
          ))}
        </ul>
        <h3>Extracted Urls:</h3>
        <ul>
          {extractedUrls.map((url) => (
            <li>{url}</li>
          ))}
        </ul>

        
      </div>
      </>
  )
}
