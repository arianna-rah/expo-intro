import React, {useState, useContext, useRef, useMemo, createContext, ReactNode} from "react";
import {View, Text, Button, TextInput, StyleSheet} from "react-native";

type ThemeColors = {
  bg: string;
  text: string;
};

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const value: ThemeContextType = {
    darkMode,
    toggleTheme: () => setDarkMode((prev) => !prev),
    colors: darkMode
      ? { bg: "#121212", text: "#ffffff" }
      : { bg: "#ffffff", text: "#000000" },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function DemoScreen() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("DemoScreen must be used within ThemeProvider");
  }

  const { colors, toggleTheme } = theme;

  const inputRef = useRef<TextInput | null>(null);

  const [count, setCount] = useState<number>(0);

  const someCalculation: number = useMemo(() => {
    let total = 0;
    for (let i = 0; i < 10_000_000; i++) {
      total += i;
    }
    return total + count;
  }, [count]);

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        React Native Hooks Demo (TS)
      </Text>

      <Text style={{ color: colors.text }}>
        Result: {someCalculation}
      </Text>

      <Button
        title="Increase Count"
        onPress={() => setCount((prev) => prev + 1)}
      />

      <View style={{ marginVertical: 20 }}>
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.text },
          ]}
          placeholder="Tap button to focus me"
          placeholderTextColor="#888"
        />
        <Button
          title="Focus Input (useRef)"
          onPress={() => inputRef.current?.focus()}
        />
      </View>

      <Button
        title="Toggle Theme (useContext)"
        onPress={toggleTheme}
      />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DemoScreen />
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});