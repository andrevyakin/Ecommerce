module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "standard",
        "plugin:react/jsx-runtime"
    ],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        //Удаление ненужного return
        "arrow-body-style": ["error", "as-needed"],

        indent: ["error", 4], //Отступ количество пробелов
        semi: [2, "always"], //Точка с запятой в конце строки

        //Ошибка при наличии пробела при обозначении функции, уберём её
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "always"
            }
        ],

        //Отключает пробелы в комментариях
        "spaced-comment": [
            "error",
            "never",
            {
                line: {
                    markers: ["/"],
                    exceptions: ["-", "+"]
                },
                block: {
                    markers: ["!"],
                    exceptions: ["*"],
                    balanced: true
                }
            }
        ],

        //Отключение проверки написания тернарного оператора
        "multiline-ternary": ["off"],

        //Использование двойных кавычек
        quotes: ["error", "double", {allowTemplateLiterals: true}],

        //Отключает проверку логических выражений, чтобы можно было писать, например while (true)
        "no-constant-condition": 0,

        //Не требует пробел внутри фигурных скобок
        "object-curly-spacing": ["error", "never"]
    }
};
