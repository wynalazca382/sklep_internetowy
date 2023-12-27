import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;




