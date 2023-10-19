import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContractView from "../views/ContractView.vue";
import AuditSubmission from "@/views/AuditSubmission.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/contract/:address?",
      name: "contract",
      component: ContractView,
    },
    {
      path: "/submit",
      name: "submit",
      component: AuditSubmission,
    },
    { path: "/404", component: NotFound },
    {
      path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
      redirect: "/404",
    },
  ],
});

export default router;
