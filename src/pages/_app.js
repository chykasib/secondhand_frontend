import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ErrorBoundary>
  );
}
