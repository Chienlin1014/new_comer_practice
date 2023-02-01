import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        helloVuex:'Hello Vuex'
    },
    getters: {
    },
    mutations: {
        CHANGE(state, value) {
            alert(`我在這裡mutation`)
            this.$store.state.helloVuex=value;
            console.log("helloVuex:"+ state.helloVuex)
        },
    },
    actions: {
        chageA(context, value) {

            context.commit('CHANGE',value)
        },
    },
    modules: {
    }
})
