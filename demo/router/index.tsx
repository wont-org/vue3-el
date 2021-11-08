import {
    RouteRecordRaw, createRouter, createWebHistory 
} from 'vue-router'
import { get } from 'lodash'

function isUpperCase(ch) {
    return ch >= 'A' && ch <= 'Z'
}

export const getRoutes = () => {
    const routes: RouteRecordRaw[] = []

    // '../../components/**[a-zA-Z]+/index.tsx',
    const components = import.meta.glob('../../es/**[a-zA-Z]+/index.js', {
        caseSensitiveMatch: true,
    })
    console.log('components :>> ', components)
    Object.keys(components).forEach((relativeUrl) => {
        // const matched = relativeUrl.match(/components\/(.*)\/index\.tsx/)
        const matched = relativeUrl.match(/es\/(.*)\/index\.js/)
        const fileName = get(matched, '[1]', '')
        if (isUpperCase(fileName.substr(0, 1))) {
            routes.push({
                path: `/${fileName}`,
                name: fileName,
                component: components[relativeUrl],
            })
        }
    })
    routes.push({
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: routes[0].component,
        redirect: routes[0].path,
        meta: {
            isHidden: true,
        },
    })
    return routes
}

export const routes: RouteRecordRaw[] = getRoutes()
console.log('routes :>> ', routes)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
