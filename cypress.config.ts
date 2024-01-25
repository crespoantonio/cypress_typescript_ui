import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  waitForAnimations: true,
  watchForFileChanges: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 8000,
  reporter: 'mochawesome',
  e2e: {
    baseUrl: 'https://practice.automationtesting.in/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
