// store/auth.js
const state = {
  isAuthenticated: false,
  userId: null,
  userAdmin: null,
  token: "",
};

const mutations = {
  SET_AUTHENTICATED(state, value) {
    state.isAuthenticated = value;
  },
  SET_USER_ID(state, userId) {
    // Agrega una nueva mutación para establecer el userId
    state.userId = userId;
  },
  SET_USER_ADMIN(state, userAdmin) {
    state.userAdmin = userAdmin;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  // Otras mutaciones relacionadas con la autenticación
};

const actions = {
  login({ commit }, userId, userAdmin, token) {
    // Aquí colocarías tu lógica de inicio de sesión
    // Cuando el inicio de sesión es exitoso, estableces isAuthenticated en true
    commit("SET_AUTHENTICATED", true);

    // Establecer el userId en el estado
    commit("SET_USER_ID", userId);
    commit("SET_USER_ADMIN", userAdmin);
    commit("SET_TOKEN", token);
  },
  logout({ commit }) {
    // Lógica para cerrar sesión
    // Cuando se cierra sesión, estableces isAuthenticated en false
    commit("SET_AUTHENTICATED", false);
    commit("SET_USER_ID", null);
    commit("SET_USER_ADMIN", null);
    commit("SET_TOKEN", "");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
