import React, { lazy, Suspense, useState } from 'react';
const PasswordInput = lazy(() => import('./components/PasswordInput'));

const SignUp: React.FunctionComponent = () => {
  const [password, setPassword] = useState('');
  return <form>
      <label>Enter your password:</label><br />
      <Suspense fallback={<input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />}>
      <PasswordInput password={password} setPassword={setPassword} />
      </Suspense>
      
  </form>
};

export default SignUp;
