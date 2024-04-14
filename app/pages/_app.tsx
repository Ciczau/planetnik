import GlobalStyles from "@/app/utils/globalStyles";
import { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";

const font = Montserrat({ weight: "400", subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className={font.className}>
      <GlobalStyles />
      <Component {...pageProps} key={router.asPath} />
    </div>
  );
}

export default MyApp;
