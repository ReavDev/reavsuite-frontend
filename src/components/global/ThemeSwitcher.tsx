"use client";

import { motion } from "framer-motion";
import { Moon, Monitor, Sun } from "lucide-react";
import { cn } from "~/utils";
import { useTheme } from "~/hooks/theme";

export default function ThemeSwitcher() {
  const { updateTheme, theme } = useTheme();

  const teams = [
    { id: "dark", icon: Moon },
    { id: "system", icon: Monitor },
    { id: "light", icon: Sun },
  ] as const;

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-lg">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => updateTheme(team.id)}
            className={cn(
              "relative rounded-full p-2 transition-all duration-300",
              theme === team.id
                ? "bg-white text-gray-900"
                : "text-white hover:bg-white/10"
            )}
          >
            <team.icon className="h-5 w-5" />
            <span className="sr-only">{team.id}</span>
            {theme === team.id && (
              <motion.div
                className="absolute inset-0 z-10 rounded-full bg-white"
                layoutId="activeTeam"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
