import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { inter, lora } from '@/lib/fonts'
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const metadata = {
  title: 'Kitchi: AI Recipe Generator',
  description: 'Generate recipe ideas and full recipes using AI',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧑‍🍳</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <body
        className={`font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center font-serif">Kitchi: AI Recipe Generator  <ThemeToggle /></h1>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}