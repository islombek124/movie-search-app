<script setup>
import { store } from "../stores/store";
import axios from "axios";
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import Results from "../components/Results.vue";
import DataList from "../components/DataList.vue";

const defineStore = store();

const showResult = ref(false);

const url = `https://api.themoviedb.org/3/movie/popular`;

let movies = ref([]);
const dt = ref(),
  pg = ref(1),
  ttPage = ref(),
  trm = ref("");

function fetchData() {
  axios
    .get(url, {
      params: {
        api_key: defineStore.api_data.api_key,
      },
    })
    .then((data) => (movies.value = data.data.results));
}

function showResults(term, data, page, totalPage) {
  trm.value = term;
  dt.value = data;
  pg.value = page;
  ttPage.value = totalPage;
  showResult.value = true;
}

function hideResults() {
  showResult.value = false;
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="w-full p-3 grid gap-12 bg-slate-700">
    <div>
      <Header @showResults="showResults" @hideResults="hideResults" />
    </div>
    <div>
      <Results
        v-if="showResult"
        :term="trm"
        :dt="dt"
        :page="pg"
        :totalPage="ttPage"
      />
    </div>
    <div>
      <DataList v-if="!showResult" :movies="movies" />
    </div>
  </div>
</template>
