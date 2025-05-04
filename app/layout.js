import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "./context/Appcontext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
  
export const metadata = {
  title: "Deepseek",
  description: "Full Stack Project",
};

export default function RootLayout({ children }) {
  return (
   
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        
        <AppContextProvider>
        {children}
        </AppContextProvider>
        
      </body>
    </html>
    </ClerkProvider>
   
   
  );
}