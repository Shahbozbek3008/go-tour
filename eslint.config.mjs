import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
    ...compat.config({
        extends: [
            "next/core-web-vitals",
            "next/typescript",
            "prettier",
            "eslint:recommended",
            "plugin:@tanstack/query/recommended",
        ],
        rules: {
            "react/no-unescaped-entities": "off",
            "no-irregular-whitespace": "off",
            "no-undef": "off",
            "react/prop-types": "off",
            "no-unused-vars": "off", // Turn off base rule
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                    args: "after-used",
                },
            ],
            "@typescript-eslint/prefer-nullish-coalescing": "off",
            "@typescript-eslint/consistent-type-definitions": "off",
            "@tanstack/query/exhaustive-deps": "off",
        },
    }),
]

export default eslintConfig
