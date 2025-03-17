import { Header } from "../components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body>
        <div className="background">
          <Header />
          <div className="main">
            <div className="main-contents">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
