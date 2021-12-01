import createPersistedState from 'vuex-persistedstate';

// keep the store in local storage so we do not lose any info
// once nuxt is ready, it will save the state to local storage

export default ({ store }) => {
    window.onNuxtReady(() => {
        createPersistedState({})(store);
    })
}