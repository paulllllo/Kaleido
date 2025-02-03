module.exports = {
    root: true,
    extends: [
        'standard'
        // "eslint:recommended",
        // "airbnb",
    ],
    rules: {
        indent: ['error', 4]
    },
    globals: {
        IS_DEVELOPMENT: 'readonly'
    },
    parserOptions: {
        ecmasVersion: 2020
    }
    //   indent: [
    //     "error",
    //   ]
}
