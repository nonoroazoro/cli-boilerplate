import { defineConfig } from "eslint-config-zoro";

export default defineConfig({
    node: true,
    react: true,
    typescript: true,
    ignores: ["dist/**"],
    languageOptions: {
        parserOptions: {
            project: "./tsconfig.eslint.json"
        }
    },
    rules: {
        "n/no-top-level-await": "off",
        "no-console": "off"
    }
});
