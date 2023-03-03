<script>
import { store } from "../stores/store";
export default {
  setup() {
    const defineStore = store();

    return { defineStore };
  },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <h1 class="text-white text-3xl font-semibold">Popular movies</h1>
    </div>
    <div>
      <ul class="grid lg:grid-cols-5 sm:grid-cols-3 mx-auto gap-5 mt-3">
        <li
          v-for="movie in movies"
          :key="movie.id"
          class="text-slate-200 overflow-hidden bg-slate-800 rounded-lg p-3 grid items-stretch"
        >
          <router-link :to="`/movie/${movie.id}`" class="contents">
            <img
              :src="defineStore.api_data.imgUrl + movie.poster_path"
              :alt="movie.title"
              class="hover:scale-105 duration-300 object-cover"
              width="400"
              height="600"
          /></router-link>
          <router-link :to="`/movie/${movie.id}`" class="contents">
            <h3 class="font-semibold text-lg my-3 hover:underline">
              {{ movie.title }}
            </h3>
          </router-link>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1 text-2xl bg-slate-800">
              <span
                class="fa fa-star"
                :class="[movie.vote_average >= 1 ? 'checked' : '']"
              ></span>
              <span
                class="fa fa-star"
                :class="[movie.vote_average >= 3 ? 'checked' : '']"
              ></span>
              <span
                class="fa fa-star"
                :class="[movie.vote_average >= 5 ? 'checked' : '']"
              ></span>
              <span
                class="fa fa-star"
                :class="[movie.vote_average >= 7 ? 'checked' : '']"
              ></span>
              <span
                class="fa fa-star"
                :class="[movie.vote_average == 10 ? 'checked' : '']"
              ></span>
            </div>
            <span class="text-lg font-semibold">{{
              Number(movie.vote_average).toFixed(1)
            }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.checked {
  color: rgb(29 78 216 / var(--tw-text-opacity));
}
</style>
