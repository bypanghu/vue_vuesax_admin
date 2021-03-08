
import router from '@/router'
import { getToken ,setToken ,removeToken} from '@/auth/token'

const getDefaultState = () => {
  return {
    token: '',
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve) => {
        const {phone ,message} = userInfo
        if(phone == 18221111111 && message == 1234){
            commit('SET_TOKEN', 'admin_vue_panghu_token')
            setToken('admin_vue_panghu_token')
            resolve({
                code : 1200 ,
                message : '登录成功'
            })
        }else{
            resolve({
                code : 1400 ,
                message : '账号验证码错误！'
            })
        }
    })
   
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve)=>{
      if(state.token || getToken()){
        commit('SET_AVATAR','https://avatars.githubusercontent.com/u/56402715?s=460&u=fe74be1801d63da88563e93ae58f67385f0665a6&v=4')
        commit('SET_NAME','胖虎')
      }
     resolve()
    })
   
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

