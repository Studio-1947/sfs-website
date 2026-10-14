import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "Schools for Skills — Health Education Platform",
  description:
    "Learn health and first aid, get tested, earn a verified certificate — in English, Bengali, Hindi and Nepali.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300..800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try {
              var t = localStorage.getItem("theme");
              if (t !== "light") {
                document.documentElement.classList.add("dark");
              }
            } catch (e) {
              document.documentElement.classList.add("dark");
            }`,
          }}
        />
      </head>
      <body className="font-sans bg-brand-cream text-brand-black antialiased transition-colors duration-200 dark:bg-brand-black dark:text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
