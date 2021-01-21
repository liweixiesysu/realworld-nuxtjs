export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user;
    }
}

const cookieparser = process.server ? require('cookieparser') : undefined;
export const actions = {
    nuxtServerInit({commit}, {req}) {
        let user = null;
        if (req.headers.cookie) {
            let parsed = cookieparser.parse(req.headers.cookie);
            try {
                user = JSON.parse(parsed.user);
            } catch (error) {

            }
        }

        commit('setUser', user);
    }
}