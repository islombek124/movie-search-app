import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/:type/:id",
      name: "info-page",
      component: () => import("../views/InfoPage.vue"),
    },
  ],
});

export default router;
