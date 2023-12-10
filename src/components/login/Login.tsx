// components/Login.tsx
import { SignIn, SignedOut } from '@clerk/clerk-react';

const Login = () => {
  return (
    <div>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
};

export default Login;
