export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "jerga99--nuxt-posts",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  // Customize the progress-bar color
  loading: { color: "#ff0000" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/filters.js" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/moment"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/bulma"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // serverMiddleware: [
  //   //! ovo ne trba da se mesa sa onim nasim middleware. serverMiddleware je kolekcija node i express kompatibilne middleware koje ce biti executovane prajer (WTF) to the nuxt rendering process. dakle ovde mozemo da pokrenemo bilo koji express middleware koji zelimo da se pokrene PRVI ukljucujuci nas licni. pa hajmo da kreiramo novi folder, recimo api, i njemu index.js u kom cemo napisati nas licni express kod, a pre toga hajde prvo d ainstaliramo Express npm install --save express
  //   // bodyParser.json(),
  //   "~/server" // a index.js ne treba jer automatski tarzi index.js
  // ],

  serverMiddleware: ["~/server/routes/index"],
  // serverMiddleware: ["~/api/index.js"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  }
};
