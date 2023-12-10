import '@/styles/globals.css'
import { ClerkProvider } from "@clerk/clerk-react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      // ... inne konfiguracje ClerkProvider
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;




