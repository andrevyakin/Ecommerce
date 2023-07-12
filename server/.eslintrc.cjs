module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true
    },
    extends: "standard",
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        indent: ["error", 4], // Отступ количество пробелов
        semi: [2, "always"], // Точка с запятой в конце строки

        // Ошибка при наличии пробела при обозначении функции, уберём её
        "space-before-function-paren": ["error", "never"],

        // Использование двойных кавычек
        quotes: ["error", "double", { allowTemplateLiterals: true }]
    }
};
