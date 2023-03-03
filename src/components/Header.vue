<script setup>
import { store } from "../stores/store";
import { ref, defineEmits, watch } from "vue";
const emit = defineEmits(["showResults", "hideResults"]);

const defineStore = store();

let term = ref("");

const dt = ref([]),
  page = ref(1),
  totalPages = ref();

function fetchMovie() {
  fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${defineStore.api_data.api_key}&query=${term.value}&page=${page.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      dt.value = data.results;
      page.value = data.page;
      totalPages.value = data.total_pages;
      console.log(data.results);
    })
    .catch((err) => console.log(err));
}
watch(
  () => term.value,
  (newValue, oldValue) => {
    if (newValue !== "") {
      emit("showResults", term.value, dt.value, page.value, totalPages.value);
    } else {
      emit("hideResults");
    }
  }
);
</script>

<template>
  <header
    class="w-full flex flex-col md:justify-between md:items-center md:flex-row gap-y-3"
  >
    <div class="logo">
      <a href="/" class="select-none">
        <img src="../assets/logo.png" class="sm:block hidden" alt="logo" />
        <img src="../assets/logo_mobile.png" class="sm:hidden" alt="logo" />
      </a>
    </div>
    <form @submit.prevent="fetchMovie">
      <label
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="contents">
        <input
          type="search"
          v-model.trim="term"
          class="block w-full p-4 pl-7text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Search movies"
          @input="fetchMovie"
        />
      </div>
    </form>
  </header>
</template>

<style lang="scss" scoped>
form {
  width: 100%;
  label {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .contents {
    position: relative;
    display: flex;
    align-items: center;
  }
}

@media (min-width: 1024px) {
  form {
    width: 40%;
  }
}

@media (prefers-color-scheme: dark) {
  input {
    border-color: rgb(59 130 246 / 1);
  }
}
</style>
