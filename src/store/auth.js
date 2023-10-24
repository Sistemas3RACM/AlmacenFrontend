// store/auth.js
const state = {
    isAuthenticated: false,
    // Otros datos de autenticación que desees almacenar
  };
  
  const mutations = {
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value;
    },
    // Otras mutaciones relacionadas con la autenticación
  };
  
  const actions = {
    login({ commit }) {
      // Aquí colocarías tu lógica de inicio de sesión
      // Cuando el inicio de sesión es exitoso, estableces isAuthenticated en true
      commit('SET_AUTHENTICATED', true);
    },
    logout({ commit }) {
      // Lógica para cerrar sesión
      // Cuando se cierra sesión, estableces isAuthenticated en false
      commit('SET_AUTHENTICATED', false);
    },
    // Otras acciones relacionadas con la autenticación
  };
  
  export default {
    namespaced: true, // Permite utilizar un espacio de nombres para el módulo
    state,
    mutations,
    actions,
  };
  