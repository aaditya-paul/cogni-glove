import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Cogni Glove",
  description:
    "AI-powered gesture recognition system using TensorFlow Lite on microcontrollers, with real-time detection, a web dashboard, and OLED display feedback.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
