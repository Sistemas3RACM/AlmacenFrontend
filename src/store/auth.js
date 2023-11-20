// store/auth.js
const state = {
  isAuthenticated: false,
  userId: null,
  userAdmin: null,
};

const mutations = {
  SET_AUTHENTICATED(state, value) {
    state.isAuthenticated = value;
  },
  SET_USER_ID(state, userId) { // Agrega una nueva mutación para establecer el userId
    state.userId = userId;
  },
  SET_USER_ADMIN(state, userAdmin) { 
    state.userAdmin = userAdmin;
  },
  // Otras mutaciones relacionadas con la autenticación
};

const actions = {
  login({ commit }, userId, userAdmin) {
    // Aquí colocarías tu lógica de inicio de sesión
    // Cuando el inicio de sesión es exitoso, estableces isAuthenticated en true
    commit('SET_AUTHENTICATED', true);

    // Establecer el userId en el estado
    commit('SET_USER_ID', userId);
    commit('SET_USER_ADMIN', userAdmin);
  },
  logout({ commit }) {
    // Lógica para cerrar sesión
    // Cuando se cierra sesión, estableces isAuthenticated en false
    commit('SET_AUTHENTICATED', false);
    commit('SET_USER_ID', null);
    commit('SET_USER_ADMIN', null);
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
