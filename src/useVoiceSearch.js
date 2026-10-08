import { useEffect, useRef, useState } from 'react';

export function useVoiceSearch(onText) {
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef(null);
  const onTextRef = useRef(onText);
  onTextRef.current = onText;

  useEffect(() => () => recognitionRef.current?.abort(), []);

  function toggleVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError('Voice search works in Chrome or Edge.');
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      let spoken = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        spoken += event.results[index][0].transcript;
      }
      onTextRef.current(spoken.replace(/\s+/g, ' ').trim());
      setVoiceError('');
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      setListening(false);
      if (event.error === 'aborted' || event.error === 'no-speech') return;
      setVoiceError(
        event.error === 'not-allowed'
          ? 'Allow the microphone to search by voice.'
          : 'Could not hear that. Try again.',
      );
    };
    recognitionRef.current = recognition;
    setVoiceError('');
    setListening(true);
    recognition.start();
  }

  return { listening, voiceError, toggleVoice };
}
