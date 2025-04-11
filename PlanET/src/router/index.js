import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";


// import HomeView from '../views/HomeView.vue'
// import index from '@/views/index.vue';
// import about from '@/views/about.vue';
// import aboutIndex from '@/views/about/index.vue';
// import aboutAbout from '@/views/about/about2.vue';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
  // routes: [




  //   {
  //     path: '/',
  //     name: 'index',
  //     component: index
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     component: about,
  //     children:[
  //       {
  //         path: '',
  //         name: 'aboutIndex',
  //         component: aboutIndex,
  //       },
  //       {
  //         path: 'aboutAbout',
  //         name: 'aboutAbout',
  //         component: aboutAbout,
  //       },
  //     ]
  //   },





  //   // {
  //   //   path: '/about',
  //   //   name: 'about',
  //   //   // route level code-splitting
  //   //   // this generates a separate chunk (About.[hash].js) for this route
  //   //   // which is lazy-loaded when the route is visited.
  //   //   component: () => import('../views/AboutView.vue')
  //   // }
  // ]
})

export default router
