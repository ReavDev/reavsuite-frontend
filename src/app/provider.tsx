"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { useTheme } from "~/hooks/theme";
import ThemeSwitcher from "~/components/global/ThemeSwitcher";
import { Toaster as Sonner } from "~ui/sonner";

const MINUTE = 1000 * 60;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 10 * MINUTE,
        staleTime: 1 * MINUTE,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const { theme, updateTheme } = useTheme();

  useEffect(() => {
    const t = "%c  Made By  - REAVSUITE";
    const n = [
      "font-size: 12px",
      "color: #fffce1",
      "font-family: monospace",
      "background: #0e100f",
      "display: inline-block",
      "padding: 1rem 3rem",
      "border: 1px solid #fffce1",
      "border-radius: 4px;",
    ].join(";");
    console.log(t, n);

    const setThemeClass = (newTheme: string) => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
    };

    const handleThemeChange = (event: MediaQueryListEvent) => {
      if (theme === "system") {
        updateTheme(event.matches ? "dark" : "light");
      }
    };

    if (theme === "system") {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setThemeClass(isDarkMode ? "dark" : "light");
    } else {
      setThemeClass(theme);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, [theme, updateTheme]);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <Sonner richColors expand={true} position="top-right" />
        <ThemeSwitcher />
      </QueryClientProvider>
    </SessionProvider>
  );
}
