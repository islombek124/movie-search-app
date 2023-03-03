import { defineStore } from "pinia";

export const store = defineStore("defineStore", {
  state: () => ({
    api_data: {
      api_key: "f699430d03d988fc464ed69b0b08f24c",
      imgUrl: "https://image.tmdb.org/t/p/w500",
    },
    sources: {
      videosLink: "https://www.youtube.com/watch?v=",
    },
  }),
  actions: {
    setPreview(key) {
      return `https://img.youtube.com/vi/${key}/mqdefault.jpg`;
    },
  },
});
