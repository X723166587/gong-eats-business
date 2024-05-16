import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0F6B58",
        "surfaceTint": "#0F6B58",
        "onPrimary": "#FFFFFF",
        "primaryContainer": "#A2F2DA",
        "onPrimaryContainer": "#002019",
        "secondary": "#4B635B",
        "onSecondary": "#FFFFFF",
        "secondaryContainer": "#CDE9DE",
        "onSecondaryContainer": "#072019",
        "tertiary": "#416277",
        "onTertiary": "#FFFFFF",
        "tertiaryContainer": "#C5E7FF",
        "onTertiaryContainer": "#001E2D",
        "error": "#BA1A1A",
        "onError": "#FFFFFF",
        "errorContainer": "#FFDAD6",
        "onErrorContainer": "#410002",
        "background": "#F5FBF7",
        "onBackground": "#171D1B",
        "surface": "#F5FBF7",
        "onSurface": "#171D1B",
        "surfaceVariant": "#DBE5DF",
        "onSurfaceVariant": "#3F4945",
        "outline": "#6F7975",
        "outlineVariant": "#BFC9C4",
        "shadow": "#000000",
        "scrim": "rgba(0, 0, 0, 0.4)",
        "inverseSurface": "#2B322F",
        "inverseOnSurface": "#ECF2EE",
        "inversePrimary": "#86D6BE",
        "primaryFixed": "#A2F2DA",
        "onPrimaryFixed": "#002019",
        "primaryFixedDim": "#86D6BE",
        "onPrimaryFixedVariant": "#005141",
        "secondaryFixed": "#CDE9DE",
        "onSecondaryFixed": "#072019",
        "secondaryFixedDim": "#B2CCC2",
        "onSecondaryFixedVariant": "#344C44",
        "tertiaryFixed": "#C5E7FF",
        "onTertiaryFixed": "#001E2D",
        "tertiaryFixedDim": "#A9CBE3",
        "onTertiaryFixedVariant": "#294A5E",
        "surfaceDim": "#D5DBD7",
        "surfaceBright": "#F5FBF7",
        "surfaceContainerLowest": "#FFFFFF",
        "surfaceContainerLow": "#EFF5F1",
        "surfaceContainer": "#E9EFEB",
        "surfaceContainerHigh": "#E3EAE5",
        "surfaceContainerHighest": "#DEE4E0"
      },
      fontFamily: {
        "Sofia": ['sofia-pro', 'sans-serif'],
      },
      borderRadius: {
        "4xl": "2rem"
      }
    },
  },
  plugins: [],
};
export default config;
