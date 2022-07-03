import Vue from 'vue';
import VueRouter from 'vue-router';
import { userKey } from '@/global';
// import Users from '/src/view/admin/users/HeaderTitle';
// import Auth from '@/components/auth/Login';

import Caixa from '/src/view/caixa/Caixa';
import Clientes from '/src/view/clientes/Clientes';
import NovoCliente from '/src/view/novoCliente/NovoCliente';

Vue.use(VueRouter);

const routes = [
  // {
  //   name: 'login',
  //   path: '/login',
  //   component: Auth,
  // },

  // {
  //   name: 'users',
  //   path: '/users',
  //   component: Users,
  // },
  {
    name: 'caixa',
    path: '/',
    component: Caixa,
  },
  {
    name: 'caixa',
    path: '/caixa',
    component: Caixa,
  },
  {
    name: 'clientes',
    path: '/clientes',
    component: Clientes,
  },
  {
    name: 'novo-cliente',
    path: '/novo-cliente',
    component: NovoCliente,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const json = JSON.parse(localStorage.getItem(userKey));

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user && user.user.isAdmin ? next() : next({ path: '/' });
  } else {
    next();
  }
});

export default router;
