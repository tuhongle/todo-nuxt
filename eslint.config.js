import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import js from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ts.configs.recommended,
  js.configs.recommended,
   {
      rules: {
          "no-unused-vars": "warn",
          "no-undef": "warn"
      }
   }
];