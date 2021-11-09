import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const scrollBehavior = (to, from, savedPosition) => {
  const position = {};
  let fromRouteMatchedHasSaveScrollPosition = false;
  const fromRouteHasSaveScrollPosition = from.matched.some((item) => item.meta.saveScrollPosition);

  if (savedPosition) {
    return savedPosition;
  }

  if (to.hash) {
    position.selector = to.hash;
    return position;
  }

  from.matched ? (fromRouteMatchedHasSaveScrollPosition = fromRouteHasSaveScrollPosition) : '';

  if (fromRouteMatchedHasSaveScrollPosition) {
    return false;
  }

  return { x: 0, y: 0 };
};

export const router = new VueRouter({
  mode: 'history',

  base: '/04-SPA/03-ScrollBehavior',
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('../views/MeetupPage'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/MeetupDescriptionPage'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/MeetupAgendaPage'),
        },
      ],
    },
  ],
});
