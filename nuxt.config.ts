// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "@nuxt/icon",
    '@pinia/nuxt',
  ],
  components: ["~/components/ui", "~/components/shared", "~/components"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  supabase: {
    redirectOptions: {
      login: "/auth",
      callback: "/confirm",
      exclude: ["/"],
    },
  },
  runtimeConfig: {
    openaiKey: "",
    replicateKey: "",
    stripeSecret: '',
    stripeWebhookSecret: '',
    appUrl: '',
    public: {
      publicStripeKey: '',
    }
  },
});
