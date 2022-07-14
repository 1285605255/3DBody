// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';

import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import px2rem from 'postcss-plugin-px2rem';


const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api2': {
      target:'http://111.229.63.2:9008/api/',  // 履约后台服务
      // target: 'http://122.51.155.188:8006', // 后台服务地址以及端口号 (郭哥的)
      // target: 'http://81.68.184.44:8000', // 后台服务地址以及端口号 (郭哥的)
      // target: 'http://101.34.135.102:8011', // 后台服务地址以及端口号 (zzz)/
      // target: 'http://101.34.135.102:8010', // 后台服务地址以及端口号 (家辉)/

      ws: true, // websoket 服务
      changeOrigin: true, //是否跨域
      pathRewrite: { '/api2': '' }
    },

    '/api3': {
      target: 'https://3-d-health-1253940515.cos.ap-shanghai.myqcloud.com', // 存储桶加载模型之类
      // ws: true, // websoket 服务
      changeOrigin: true, //是否跨域
      pathRewrite: { '/api3': '' }
    },
    proxy:[REACT_APP_ENV || 'dev']},
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: { type: 'none' },
  // webpack5: {},
  exportStatic: {},
  // fastRefresh: {},
  runtimePublicPath:true,
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 16, // 开启hd后需要换算：rootValue=designWidth*100/750,此处设计稿为1920，所以1920*100/750=256
      selectorBlackList: ['ant-pro-basicLayout'], //以包含t_npx的class不需要转换
    }),
  ],
});
