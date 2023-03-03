<script setup>
import { computed, defineProps, onMounted, watch } from "vue";

const { term, dt, page, totalPage } = defineProps([
  "term",
  "dt",
  "page",
  "totalPage",
]);

const scrollTrigger = () => {
  window.addEventListener("scroll", (e) => {
    console.log(getComputedStyle(document.body).backgroundColor);
  });
};

scrollTrigger();
</script>

<template>
  <div class="container bg-slate-700 h-screen z-50 p-3">
    <div class="content flex flex-col gap-8">
      <div>
        <h1 class="font-semibold text-2xl text-slate-200 whitespace-normal">
          Results For: {{ term }}
        </h1>
      </div>
      <div class="py-3">
        <ul
          class="grid lg:grid-cols-5 sm:grid-cols-3 mx-auto gap-5 mt-3 bg-slate-700"
        >
          <li
            v-for="dt in dt"
            :key="dt.id"
            class="text-slate-200 overflow-hidden bg-slate-800 rounded-lg p-3 grid items-stretch"
          >
            <router-link
              :to="`/${dt.first_air_date ? 'tv' : 'movie'}/${dt.id}`"
              class="contents"
            >
              <img
                v-if="dt.poster_path !== null"
                :src="'https://image.tmdb.org/t/p/w500' + dt.poster_path"
                :alt="dt.first_air_date ? dt.name : dt.title"
                class="hover:scale-105 duration-300 object-cover object-center"
                width="400"
                height="600"
              />
              <img
                src="../assets/not-found.png"
                v-else
                :alt="dt.first_air_date ? dt.name : dt.title"
                class="hover:scale-105 duration-300 object-cover object-center"
                width="400"
                height="600"
              />
            </router-link>
            <router-link
              :to="`/${dt.first_air_date ? 'tv' : 'movie'}/${dt.id}`"
              class="contents"
            >
              <h3 class="font-semibold text-lg my-3 hover:underline">
                {{ dt.first_air_date ? dt.name : dt.title }}
              </h3>
            </router-link>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1 text-2xl bg-slate-800">
                <span
                  class="fa fa-star"
                  :class="[dt.vote_average >= 1 ? 'checked' : '']"
                ></span>
                <span
                  class="fa fa-star"
                  :class="[dt.vote_average >= 3 ? 'checked' : '']"
                ></span>
                <span
                  class="fa fa-star"
                  :class="[dt.vote_average >= 5 ? 'checked' : '']"
                ></span>
                <span
                  class="fa fa-star"
                  :class="[dt.vote_average >= 7 ? 'checked' : '']"
                ></span>
                <span
                  class="fa fa-star"
                  :class="[dt.vote_average == 10 ? 'checked' : '']"
                ></span>
              </div>
              <span class="text-lg font-semibold">{{
                Number(dt.vote_average).toFixed(1)
              }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.checked {
  color: rgb(29 78 216 / var(--tw-text-opacity));
}
</style>
