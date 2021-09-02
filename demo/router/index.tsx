import {
    RouteRecordRaw, createRouter, createWebHistory 
} from 'vue-router'
import { get } from 'lodash'

function isUpperCase(ch) {
    return ch >= 'A' && ch <= 'Z'
}

export const getRoutes = () => {
    const routes: RouteRecordRaw[] = []
    const components = import.meta.glob(
        '../../components/**[a-zA-Z]+/index.tsx',
        {
            caseSensitiveMatch: true,
        }
    )
    Object.keys(components).forEach((relativeUrl) => {
        const matched = relativeUrl.match(/components\/(.*)\/index\.tsx/)
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
