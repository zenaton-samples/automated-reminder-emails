import Vue from "vue";
import VueRouter from "vue-router";

import BookAPlace from "../views/BookAPlace.vue";
import ReminderLoop from "../views/ReminderLoop.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: () => {
      return "/examples/reminder-loop";
    }
  },
  {
    path: "/examples/book-a-place",
    name: "example-book-a-place",
    component: BookAPlace
  },
  {
    path: "/examples/reminder-loop",
    name: "reminder-loop",
    component: ReminderLoop
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
