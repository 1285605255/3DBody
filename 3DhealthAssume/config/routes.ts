export default [
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       path: '/user',
  //       routes: [
  //         {
  //           name: 'login',
  //           path: '/user/login',
  //           component: './user/Login',
  //         },
  //       ],
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },


  {
    path: '/extraModeCom',
    name: 'extraModeCom',
    icon: 'smile',

    component: './ExtraModelCom',
    hideInMenu:true,
  },
  {
    path: '/sliderModel',
    name: 'sliderOrga',
    icon: 'smile',

    component: './SliderOrga',
    hideInMenu:true,
  },

  {
    path: '/',
    // redirect: '/sliderModel',
    redirect: '/extraModeCom',
  },
  {
    component: './404',
  },
];
