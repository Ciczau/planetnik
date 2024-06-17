import { FavouritesProvider } from "@/app/context/activities/favourities";
import { SavedActivitiesProvider } from "@/app/context/activities/saved";
import { LocationProvider } from "@/app/context/location";
import { UserProvider } from "@/app/context/user";
import GlobalStyles from "@/app/utils/globalStyles";
import { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";

const font = Montserrat({ weight: "400", subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className={font.className}>
      <UserProvider>
        <LocationProvider>
          <FavouritesProvider>
            <SavedActivitiesProvider>
              <GlobalStyles />
              <Component {...pageProps} key={router.asPath} />
            </SavedActivitiesProvider>
          </FavouritesProvider>
        </LocationProvider>
      </UserProvider>
    </div>
  );
}

export default MyApp;
