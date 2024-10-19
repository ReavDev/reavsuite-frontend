import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type ThemeProps = 'light' | 'dark' | 'system'

interface ThemeState {
    theme: ThemeProps
    setTheme: (theme: ThemeProps) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (newTheme) => set({ theme: newTheme }),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export function useTheme() {
    const { theme, setTheme } = useThemeStore()

    const updateTheme = (newTheme: ThemeProps) => {
        setTheme(newTheme)
        if (newTheme === 'system') {
            document.documentElement.classList.remove('dark', 'light')
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark')
            }
        } else {
            document.documentElement.classList.remove('dark', 'light')
            document.documentElement.classList.add(newTheme)
        }
    }

    return { theme, updateTheme }
}