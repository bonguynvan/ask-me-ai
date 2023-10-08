import { createRouter, createWebHistory } from "vue-router"
import TextView from '@/views/TextView.vue'

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'text',
            path: '/text',
            component: TextView
        }
    ]
})
