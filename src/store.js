import { createStore } from "vuex";

export default createStore({
    state: {
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        SET_USER(state, { token, user, id }) {
            console.log( token)
            console.log( user)
            state.token = token;
            state.user = user;
            state.user = id;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
        },
        LOGOUT(state) {
            state.token = '';
            state.user = null;
            state.id = null;
            localStorage.removeItem('token');
            localStorage.removeItem('id');
        }
    },
    actions: {
        // Action สำหรับเข้าสู่ระบบ
        setUserData({ commit }, { token, user, id }) {
            commit('SET_USER', { token, user, id });
        },
        logout({ commit }) {
            commit('LOGOUT');
            window.location.reload();
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        getUser: state => state.user
    }
});