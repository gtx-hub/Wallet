import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { ToastContainer } from 'react-toastify';
import { APP } from "@/config/env";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP.NAME,
  description: APP.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        {/* Pre-hydration script: set theme class and CSS variables before React hydrates to avoid FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `;(function(){try{var dark={bg:'#0A0A0A',card:'#111111',text:'#FFFFFF',textSecondary:'#A3A3A3',primary:'#6fd2c0',accent:'#1cd6c6',border:'rgba(255,255,255,0.08)'};var light={bg:'#FFFFFF',card:'#F8FAFC',text:'#0F172A',textSecondary:'#6B7280',primary:'#6fd2c0',accent:'#1cd6c6',border:'rgba(15,23,42,0.06)'};var t='';try{t=localStorage.getItem('themePreference')||localStorage.getItem('theme');}catch(e){}if(!t){try{t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}catch(e){t='light';}}var vars=t==='dark'?dark:light;var r=document.documentElement;if(t==='dark'){r.classList.add('dark');}else{r.classList.remove('dark');}r.style.setProperty('--bg',vars.bg);r.style.setProperty('--card',vars.card);r.style.setProperty('--text',vars.text);r.style.setProperty('--text-secondary',vars.textSecondary);r.style.setProperty('--primary',vars.primary);r.style.setProperty('--accent',vars.accent);r.style.setProperty('--border',vars.border);}catch(e){} })();`,
          }}
        />
        <ThemeProvider>
          <WalletProvider>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
