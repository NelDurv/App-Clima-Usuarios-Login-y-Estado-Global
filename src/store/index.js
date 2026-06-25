import { createStore } from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import weather from './modules/weather'

export default createStore({
  modules: {
    auth,
    user,
    weather
  }
})