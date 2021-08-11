import React, { useEffect, useState } from 'react';
import { zxcvbn } from '@zxcvbn-ts/core'
import { FeedbackType } from '@zxcvbn-ts/core/dist/types';
import { ZxcvbnOptions } from '@zxcvbn-ts/core';
import graphs from '@zxcvbn-ts/language-common/src/adjacencyGraphs.json';
import passwords from '@zxcvbn-ts/language-common/src/passwords.json';
import commonWords from '@zxcvbn-ts/language-fr/src/commonWords.json';
import firstnames from '@zxcvbn-ts/language-fr/src/firstnames.json';
import lastnames from '@zxcvbn-ts/language-fr/src/lastnames.json';
import wikipedia from '@zxcvbn-ts/language-fr/src/wikipedia.json';
import translations from '@zxcvbn-ts/language-fr/src/translations';

interface ZxcvbnResult {
  feedback: FeedbackType,
  score: number;
}

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

const PasswordInput: React.FunctionComponent<PasswordInputProps> = ({password, setPassword}) => {
  const [zxcvbnResult, setZxcvbnResult] = useState<ZxcvbnResult | null>(null);
  useEffect(() => {
    const options = {
      dictionary: {
        passwords,
        commonWords,
        firstnames,
        lastnames,
        wikipedia
      },
      graphs,
      translations
    }
    ZxcvbnOptions.setOptions(options); 
  }, [])

  useEffect(() => {
  if(password.length > 0) {
    setZxcvbnResult(zxcvbn(password));
  }   
  }, [password, setZxcvbnResult])

  return <>
      <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
  {zxcvbnResult !== null && <div>
    <h3>Results:</h3>
    <p>Score: {zxcvbnResult.score}</p>
    <p>Warning: {zxcvbnResult.feedback.warning}</p>
    <div>
      <h6>Suggestion: </h6>
      <ul>
        {zxcvbnResult.feedback.suggestions.map(suggestion => <li key={suggestion}>{suggestion}</li>)}
      </ul>
    </div>
  </div>}
  </>
};

export default PasswordInput;