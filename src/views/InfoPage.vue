<script>
import { computed, ref } from "vue";
import { store } from "../stores/store";
import { useRoute } from "vue-router";
export default {
  setup() {
    const defineStore = store();
    const dt = ref({}),
      vd = ref([]),
      fd = ref([]),
      is = ref([]);
    const route = useRoute();

    const showResult = ref(false);
    const filter = ref("info");

    const fetchData = () => {
      fetch(
        `https://api.themoviedb.org/3/${route.params.type}/${route.params.id}?api_key=${defineStore.api_data.api_key}`
      )
        .then((res) => res.json())
        .then((data) => {
          dt.value = data;
          showResult.value = true;
          document.title = data.first_air_date ? data.name : data.title;
        });
    };

    const fetchVideos = () => {
      fetch(
        `https://api.themoviedb.org/3/${route.params.type}/${route.params.id}/videos?api_key=${defineStore.api_data.api_key}`
      )
        .then((res) => res.json())
        .then((data) => {
          vd.value = data.results;
          fd.value = data.results;
        });
    };

    const fetchImages = () => {
      fetch(
        `https://api.themoviedb.org/3/${route.params.type}/${route.params.id}/images?api_key=${defineStore.api_data.api_key}`
      )
        .then((res) => res.json())
        .then((data) => (is.value = data));
    };

    const filterVideos = (e) => {
      vd.value = fd.value.filter((c) => {
        if (e.target.value == c.type) {
          return c;
        } else if (e.target.value === "all") {
          return fd.value;
        }
      });
    };

    return {
      fetchData,
      fetchVideos,
      fetchImages,
      defineStore,
      dt,
      showResult,
      filter,
      vd,
      filterVideos,
      is,
    };
  },
  created() {
    this.fetchData();
    this.fetchVideos();
    this.fetchImages();
  },
};
</script>

<template>
  <Transition name="slide-fade">
    <main
      v-if="showResult"
      class="w-full py-4 bg-slate-700 relative flex justify-center flex-col items-center gap-y-8 h-max"
    >
      <nav class="flex items-center justify-center w-full">
        <div class="content flex items-center gap-4">
          <button
            class="text-slate-200 font-semibold text-xl active"
            @click="filter = `info`"
            :class="{
              notActive: filter !== 'info',
              active: filter === 'videos',
            }"
          >
            Info
          </button>
          <button
            class="text-slate-200 font-semibold text-xl"
            @click="filter = `videos`"
            :class="{
              notActive: filter !== 'videos',
              active: filter === 'videos',
            }"
          >
            Videos
          </button>
          <button
            class="text-slate-200 font-semibold text-xl"
            @click="filter = `images`"
            :class="{
              notActive: filter !== 'images',
              active: filter === 'images',
            }"
          >
            Images
          </button>
        </div>
      </nav>
      <div
        v-if="filter === 'info'"
        class="container grid items-start md:grid-cols-2 md:justify-between justify-center sm:w-3/4 w-full px-3 gap-5"
      >
        <div class="rounded p-0">
          <img
            v-if="dt.poster_path !== null"
            :src="defineStore.api_data.imgUrl + dt.poster_path"
            :alt="dt.title"
            width="400"
            class="border-4 border-slate-900 mx-auto object-cover"
            height="600"
          />
          <img
            src="../assets/not-found.png"
            v-else
            :alt="dt.title"
            width="400"
            class="border-4 border-slate-900 mx-auto object-cover"
            height="600"
          />
        </div>
        <div class="text-slate-200 w-full">
          <div class="">
            <h1 class="font-bold text-4xl">
              {{ dt.first_air_date ? dt.name : dt.title }}
            </h1>
            <p class="text-lg font-semibold tracking-wide text-slate-300 my-6">
              {{ dt.overview }}
            </p>
          </div>
          <div class="py-3 my-3">
            <ul class="grid grid-cols-1 gap-y-5 font-semibold text-lg">
              <li>
                Released:
                <span>{{
                  $route.params.type === "movie"
                    ? dt.release_date
                    : dt.first_air_date
                }}</span>
              </li>
              <li v-if="$route.params.type === 'movie'">
                Budget:
                <span>${{ dt.budget }}</span>
              </li>
              <li class="flex items-center md:flex-row flex-wrap gap-4">
                Genre:
                <a
                  href="/"
                  class="px-2 py-1 rounded bg-slate-500 text-slate-200"
                  v-for="genre in dt.genres"
                  :key="genre.name"
                  >{{ genre.name }}</a
                >
              </li>
              <li class="flex items-center flex-wrap gap-4">
                Languages:
                <span
                  v-for="language in dt.spoken_languages"
                  :key="language.english_name"
                  >{{ language.english_name + ", " }}</span
                >
              </li>
              <!--  -->
              <li v-if="$route.params.type === 'movie'">
                Revenue:
                <span>{{ dt.revenue }}</span>
              </li>
              <li>
                Status: <span>{{ dt.status }}</span>
              </li>
              <li>
                Production:
                <span
                  v-for="production in dt.production_companies"
                  :key="production.name"
                  >{{ production.name + ", " }}</span
                >
              </li>
            </ul>
          </div>
          <div class="mt-6 text-2xl">
            <a :href="dt.homepage">
              <i class="fa fa-link hover:text-blue-700" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <div v-if="filter === 'videos'" class="md:w-4/5 w-full px-3 relative">
        <div class="content flex flex-col gap-8">
          <div class="head flex items-center flex-wrap gap-3">
            <select
              class="select select-bordered w-full max-w-xs"
              @change="filterVideos($event)"
            >
              <option value="all">All</option>
              <option value="Featurette">Featurette</option>
              <option value="Clip">Clip</option>
              <option value="Behind the Scenes">Behind the Scenes</option>
              <option value="Trailer">Trailer</option>
              <option value="Teaser">Teaser</option>
            </select>
            <strong class="text-slate-300 whitespace-nowrap"
              >{{ vd.length }} videos</strong
            >
          </div>
          <ul
            class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-4 gap-8 relative bottom-0"
          >
            <li
              v-for="video in vd"
              :key="video.id"
              class="bg-slate-800 rounded-lg p-2 lists"
            >
              <a
                :href="defineStore.sources.videosLink + video.key"
                target="_blank"
                class="w-full flex flex-col justify-items-stretch justify-between gap-2 h-full text-white bg-transparent"
              >
                <div class="image relative overflow-hidden">
                  <img
                    :src="defineStore.setPreview(video.key)"
                    class="w-full h-full object-cover hover:scale-110 duration-150"
                  />

                  <div
                    class="play absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 55 55"
                    >
                      <circle
                        cx="27.5"
                        cy="27.5"
                        r="26.75"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      ></circle>
                      <path
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h2 class="mt-4 tracking-wide text-md font-semibold">
                  {{ video.name }}
                </h2>
                <small class="text-sm font-semibold text-gray-400 italic">
                  {{ video.type }}
                </small>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="filter === 'images'" class="md:w-4/5 w-full px-3 relative">
        <div class="content flex flex-col gap-8">
          <div class="flex flex-col items-start gap-7">
            <div class="flex flex-wrap items-center gap-3">
              <h2
                class="whitespace-nowrap font-semibold text-3xl text-slate-200"
              >
                Backdrops
              </h2>
              <strong class="whitespace-nowrap"
                >{{ is.backdrops.length }} Images</strong
              >
            </div>
            <ul
              class="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full sm:grid-cols-2 justify-center"
            >
              <li
                v-for="(image, id) in is.backdrops"
                :key="id"
                class="flex justify-center"
              >
                <div class="image mx-auto">
                  <img
                    :src="defineStore.api_data.imgUrl + image.file_path"
                    class="object-cover"
                    width="350"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div class="flex flex-col items-start gap-7">
            <div class="flex flex-wrap items-center gap-3">
              <h2
                class="whitespace-nowrap font-semibold text-3xl text-slate-200"
              >
                Posters
              </h2>
              <strong class="whitespace-nowrap"
                >{{ is.posters.length }} Images</strong
              >
            </div>
            <ul class="flex flex-wrap gap-3 w-full justify-center">
              <li
                v-for="(image, id) in is.posters"
                :key="id"
                class="flex justify-center"
              >
                <div class="image mx-auto">
                  <img
                    :src="defineStore.api_data.imgUrl + image.file_path"
                    class="object-cover"
                    style="height: 300px; width: 211px"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

button.active {
  border-bottom: 2px solid rgb(226 232 240 / 1);
}

button.notActive {
  border-bottom: none;
}

li {
  font-weight: 600;
}
</style>
