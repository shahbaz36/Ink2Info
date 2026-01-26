import Navbar from "@/components/Navbar";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isLoggedIn = true;

  return (
    <html lang="en">
      <body>
        {isLoggedIn ? <Navbar /> : <></>}
        {children}
      </body>
    </html>
  );
}
