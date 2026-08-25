import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Math Workshop", description: "A visual proof desk for one idea at a time." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
