import router from './router'
import store from './store/store'
import { getToken } from '@/auth/token'
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  if (token) {
    //存在token 
    const name = store.getters.name
    if (name) { //判断是否存在个人信息，如果没有就去访问获取信息
      //判断如果后面有信息就转跳到redirect
      next()
    } else {
      try {
        await store.dispatch('user/getInfo')
        next()
      } catch (error) {
        //出现错误，需要重新登录
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      //没有token 判断是否从登录界面来
      next()
    } else {
      //其他就转跳到登录界面去
      next(`/login?redirect=${to.path}`)
    }
  }
})
