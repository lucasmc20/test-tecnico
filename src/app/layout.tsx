import type { Metadata } from "next";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Teste técnico - Lucas Coelho",
  description: "Lista das top 20 criptomoedas do CoinGecko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}