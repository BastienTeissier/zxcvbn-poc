import React, { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';

const SignUpLegacy: React.FunctionComponent = () => {
  const [password, setPassword] = useState('');
  const [zxcvbnResult, setZxcvbnResult] = useState<zxcvbn.ZXCVBNResult | null>(null);
useEffect(() => {
 if(password.length > 0) {
  setZxcvbnResult(zxcvbn(password));
 }   
}, [password, setZxcvbnResult])
  return <><form>
      <label>Enter your password:</label><br />
      <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
  </form>
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

export default SignUpLegacy;
