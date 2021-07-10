const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    "pa-primary": {
      DEFAULT: "#0F172A",
    },
    "pa-secondary": {
      DEFAULT: "#35537c",
    },
    "pa-tertiary": {
      DEFAULT: "#5f5697",
    },
    "pa-quaternary": {
      DEFAULT: "#005a78",
    },
    "pa-quinary": {
      DEFAULT: "#d53a8c",
    },
    "pa-accent": {
      DEFAULT: "#538ff8",
    },
  },
};

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: colors,
    width: {
      100: "100px",
      200: "200px",
      300: "300px",
      400: "400px",
      500: "500px",
      600: "600px",
      700: "700px",
      800: "800px",
      900: "900px",
      1000: "1000px",
    },
    height: {
      100: "100px",
      200: "200px",
      300: "300px",
      400: "400px",
      500: "500px",
      510: "510px",
      520: "520px",
      530: "530px",
      540: "540px",
      550: "550px",
      560: "560px",
      570: "570px",
      580: "580px",
      590: "590px",
      600: "600px",
      620: "620px",
      640: "640px",
      660: "660px",
      680: "680px",
      700: "700px",
      710: "710px",
      720: "720px",
      730: "730px",
      740: "740px",
      750: "750px",
      760: "760px",
      770: "770px",
      780: "780px",
      790: "790px",
      800: "800px",
      900: "900px",
      1000: "1000px",
      auto: "auto",
    },
    boxShadow: {
      pa: "0px 0px 20px rgba(0, 0, 0, 0.5)",
    },
  },
  variants: {
    extend: {
      translate: ["responsive", "group-hover", "hover", "focus"],
    },
  },
  plugins: [],
};
