import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
});
module.exports = {
  modules: ["~/io"],
  env: {
    WS_URL: process.env.WS_URL || "http://localhost:3000",
  },
};
