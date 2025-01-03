import { Provider as AppContextProvider} from "../contexts/app";
import { Provider as AuthContextProvider} from "../contexts/auth";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp ({Component, pageProps}: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthContextProvider>
  );
} 
export default MyApp;
