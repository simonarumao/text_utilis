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
      props.showAlert("converted to uppercase","warning")

  }
  const handleDownClick = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
    props.showAlert("converted to Lowercase","warning")

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

  const copyText = () => {
    navigator.clipboard.writeText(text)
    props.showAlert("Copyed to clipboard","warning")

  }

  const pasteText = () => {
    navigator.clipboard.readText().then((clipboardText) => {
      setText(clipboardText);

    }).catch((err) => {
      console.error("failed to paste",err);
    });
    
  }

  return (
    <>
      <div className="container" style={{color: props.mode === `dark` ? `white`:`black`}}>
        <div>
            <div className="mb-3">
              <h2>{props.heading}</h2>
              <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8" style={{
                backgroundColor: props.mode === `dark` ? `black` : `white`,
              color: props.mode === `dark` ? `white`:`black`}}></textarea>
              
            </div>

            <div className="mb-3 mt-2 ">
            <input type="text" value={key} onChange={handleKeyChange} placeholder='enter encryption key' style={{ padding: "5px", border:"2px solid", borderRadius:"5px"}} />
            </div>
          
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={handleUpClick}>Convert to uppercase</button>  
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={handleDownClick}>Convert to lowercase</button> 
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={reverseString}>Reverse the string</button>   
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={replaceString}>Replace the string</button> 
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={speech}>Speech</button>        
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={clear}>Clear</button> 
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={encrypText} disabled={encryptedText || !key}>Encrypt The text</button> 
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={decrypText} disabled={!encryptedText || !key}>Decrypt The text</button> 
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={extractEmailsAndUrl}>Extract Emails and urls</button>   
          <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={copyText}>Copy Text</button>   
            <button className={`btn btn-${props.mode} mx-1 my-1`} onClick={pasteText}>Paste Text</button>   
        </div>
      </div>

      <div className="container  my-4" style={{backgroundColor: props.mode === `dark` ? `black`:`white`,color: props.mode === `dark` ? `white`:`black` }}>
        <h2>Your Text summary</h2>
        <p>{text.split(/\s+/).filter((element)=>{return element.length !== 0}).length} words and {text.length} characters</p>
        <p>{0.008 * text.length} Minutes Read</p>

        {(text.length > 0) ? 
          <div>
            <h3>Preview</h3>
            <p>{text}</p>
          </div>
          :
          <div></div>
        }

        {(extractedEmails.length > 0) ?
          <div>
              <h3>Extracted Emails:</h3>
              <ul>
                {extractedEmails.map((email) => (
                  <li>{email}</li>
                ))}
              </ul>
          </div>
          :
          " "
        }

        {(extractedUrls.length > 0) ? 
          <div>
            <h3>Extracted Urls:</h3>
            <ul>
              {extractedUrls.map((url) => (
                <li>{url}</li>
              ))}
            </ul>
          </div>
          :
          " "
        }

        
      </div>
    </>
  )
}
