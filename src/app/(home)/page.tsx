"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "~ui/button";
import { Input } from "~ui/input";
import { useTheme } from "~/hooks/theme";

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);
  const { theme, updateTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600"
        >
          ReaVSuite
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl mb-8 text-muted-foreground"
        >
          Something amazing is coming soon...
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full max-w-md space-y-4"
      >
        <Input
          type="email"
          placeholder="Enter your email for updates"
          className="w-full bg-background/50 border-yellow-500/50 focus:border-yellow-500"
        />
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
          Notify Me
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 flex space-x-4"
      >
        <Button variant="outline" size="icon">
          <Github className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Linkedin className="h-4 w-4" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute top-4 right-4"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => updateTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </motion.div>
    </div>
  );
}
