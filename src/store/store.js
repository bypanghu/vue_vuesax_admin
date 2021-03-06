/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)



/**
 * 自己写的module
 * 
 */
import user from './modules/user'


const store =new Vuex.Store ({
    getters,
    mutations,
    state,
    actions,
    modules: {
        user
    },
    strict: process.env.NODE_ENV !== 'production'
})



export default store

