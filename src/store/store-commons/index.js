import { auth } from "boot/firebase";

const state = {
  drawerState: false,
  currentYear: new Date().getFullYear(),
  whiteAvatar:
    "https://ui-avatars.com/api/?name=Palace+Admin&size=1000&background=fff&color=538ff8",
  colorAvatar:
    "https://ui-avatars.com/api/?name=Palace+Admin&size=1000&background=538ff8&color=fff",
  displayName: "",
  emailUser: "",
  appTitle: "PALACE ADMIN",
};

const getters = {
  currentYear(state) {
    return state.currentYear;
  },
  drawerState(state) {
    return state.drawerState;
  },
  appTitle(state) {
    return state.appTitle;
  },
  whiteAvatar(state) {
    return state.whiteAvatar;
  },
  colorAvatar(state) {
    return state.colorAvatar;
  },
  displayName(state) {
    return state.displayName;
  },
  emailUser(state) {
    return state.emailUser;
  },
};

const mutations = {
  updateDrawerState(state, payload) {
    state.drawerState = payload;
  },

  updateWhiteAvatar(state, payload) {
    state.whiteAvatar = payload;
  },

  updateColorAvatar(state, payload) {
    state.colorAvatar = payload;
  },

  updateDisplayName(state, payload) {
    state.displayName = payload;
  },

  updateEmailUser(state, payload) {
    state.emailUser = payload;
  },
};

const actions = {
  updateDrawerState({ commit }, opened) {
    commit("updateDrawerState", opened);
  },

  updateWhiteAvatar({ commit }, url) {
    commit("updateWhiteAvatar", url);
  },

  updateColorAvatar({ commit }, url) {
    commit("updateColorAvatar", url);
  },

  handleAuthStateChange({ commit }) {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        commit("updateDisplayName", userAuth.displayName);
        commit("updateEmailUser", userAuth.email);
        let avatar = null;
        if (userAuth.photoURL) {
          if (userAuth.photoURL.includes("facebook.com")) {
            avatar = userAuth.photoURL + "?height=500";
          } else {
            if (userAuth.photoURL.includes("googleusercontent.com")) {
              avatar = userAuth.photoURL.replace("s96-c", "s400-c");
            } else {
              avatar = userAuth.photoURL;
            }
          }
          commit("updateWhiteAvatar", avatar);
          commit("updateColorAvatar", avatar);
        } else {
          if (userAuth.displayName) {
            var matches = userAuth.displayName.match(/\b(\w)/g);
            var letters = matches.join("");
            commit(
              "updateWhiteAvatar",
              `https://ui-avatars.com/api/?name=${letters}&size=1000&background=fff&color=538ff8`
            );
            commit(
              "updateColorAvatar",
              `https://ui-avatars.com/api/?name=${letters}&size=1000&background=538ff8&color=fff`
            );
          }
        }
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
