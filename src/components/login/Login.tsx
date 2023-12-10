import { UserButton, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <button onClick={() => Clerk.openSignIn()}>Zaloguj się</button>
      </SignedOut>
    </div>
  );
}
