const src = "./src";
const build = "./dist";
const temp = "./temp";

module.exports = {
  src: src,
  build: build,
  temp: temp,

  styles: {
    src: src + "/assets/scss",
    files_src: src + "/assets/scss/**/*.scss",
    dest: build + "/assets/css/",
    temp: temp + "/assets/css/",
  },

  scripts: {
    files_src: src + "/assets/js/**/*.js",
    main_src: src + "/assets/js/main.js",
    dest: build + "/assets/js/",
    temp: temp + "/assets/js/",
  },

  templates: {
    src: src + "/templates",
    files_src: [src + "/templates/**/*.pug", src + "/templates/**/*.md"],
    page_src: src + "/templates/pages/**/*.pug",
    dest: build,
    files_dest: build + "/**/*.html",
    temp: temp,
  },

  images: {
    files_src: [
      "!" + src + "/assets/img/sprite/**/*.svg",
      "!" + src + "/assets/img/sprite.svg",
      src + "/assets/img/**/*.{jpg,png,gif,svg}",
    ],
    dest: build + "/assets/img",
    temp: temp + "/assets/img",
  },

  fonts: {
    src: src + "/assets/fonts/**",
    dest: build + "/assets/fonts",
    temp: temp + "/assets/fonts",
  },
};
