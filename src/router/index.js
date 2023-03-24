import {createRouter, createWebHistory} from "vue-router";
import Landing from '../components/Landing/Landing.vue'
import Feedback from "../components/Landing/Feedback.vue";
import Registration from "../components/registration/Registration.vue";
import Home from "../components/main/Home.vue";
import Auth from "../components/Auth.vue";
import Account from "../components/main/account/Account.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: Landing,
        },
        {
            path: '/feedback',
            name: 'Feedback',
            component: Feedback,
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration,
        },
        {
            path: '/auth',
            name: 'Auth',
            component: Auth,
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/account',
            name: 'Account',
            component: Account,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 70,
                behavior: 'smooth',
            }
        } else {
            return {top: 0, behavior: 'smooth'}
        }
    }
})
export default router