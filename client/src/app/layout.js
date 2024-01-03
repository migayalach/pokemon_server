import { Roboto } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata = {
  title: "Pokemon",
  description: "My first 'single page' with next.js consuming the Pokémon API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
