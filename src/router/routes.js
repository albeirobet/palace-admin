const routes = [
  {
    path: "/",
    redirect: "/app/user/home",
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    props: true,
    component: () => import("layouts/Auth.vue"),
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
      {
        path: "/auth/account-actions",
        name: "AccountActions",
        component: () => import("pages/auth/AccountActions.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/app",
    redirect: "/app/user/home",
    props: true,
    component: () => import("layouts/App.vue"),
    meta: {
      requireAuth: true,
      // authorizedRoles: ["user"],
    },
    children: [
      {
        path: "/app/user/home",
        name: "Home",
        component: () => import("pages/app/user/Home.vue"),
        props: true,
      },
      {
        path: "/app/user/profile",
        redirect: "/app/user/profile/contact-data",
        name: "Profile",
        component: () => import("pages/app/user/Profile.vue"),
        props: true,
        // meta: {
        //   authorizedRoles: ["admin"],
        // },
        children: [
          {
            path: "/app/user/profile/contact-data",
            name: "ContactData",
            component: () => import("components/app/user/ContactData.vue"),
          },
          {
            path: "/app/user/profile/personal-data",
            name: "PersonalData",
            component: () => import("components/app/user/PersonalData.vue"),
          },
          {
            path: "/app/user/profile/account-settings",
            name: "AccountSettings",
            component: () => import("components/app/user/AccountSettings.vue"),
          },
        ],
      },
    ],
  },

  {
    path: "/forbidden",
    redirect: "/forbidden",
    component: () => import("layouts/Auth.vue"),
    children: [
      {
        path: "/forbidden",
        name: "Forbidden",
        component: () => import("pages/app/commons/Forbidden.vue"),
        props: true,
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    redirect: "/not-found",
    component: () => import("layouts/Auth.vue"),
    children: [
      {
        path: "/:catchAll(.*)*",
        name: "NotFound",
        component: () => import("pages/app/commons/NotFound.vue"),
        props: true,
      },
    ],
  },
];

export default routes;
