const routes = [
  {
    path: "/xxx",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/about", component: () => import("pages/About.vue") },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    props: true,
    component: () => import("layouts/Auth.vue"),
    props: true,
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () => import("pages/auth/Login.vue"),
        props: true,
      },
      {
        path: "/auth/register",
        name: "Register",
        component: () => import("pages/auth/Register.vue"),
        props: true,
      },
      {
        path: "/auth/recover-account",
        name: "RecoverAccount",
        component: () => import("pages/auth/RecoverAccount.vue"),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
