import { defineUserConfig, defaultTheme } from 'vuepress'
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
import { searchProPlugin } from 'vuepress-plugin-search-pro'

const USER_NAME = 'Sun-ZhenXing'
const BASE_PATH = '/vuepress-database-notes/'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '数据库笔记合集',
  description: '各种数据库和 SQL 笔记',
  head: [
    ['link', { rel: 'icon', href: `${BASE_PATH}favicon.svg` }]
  ],
  base: BASE_PATH,
  markdown: {
    code: {
      lineNumbers: 10
    }
  },
  theme: defaultTheme({
    logo: '/favicon.svg',
    repo: `${USER_NAME}${BASE_PATH}`,
    editLinkText: '在 GitHub 上编辑此页',
    contributorsText: '贡献者',
    lastUpdatedText: '上次更新',
    navbar: [
      {
        text: '数据库系统概论',
        children: [
          {
            text: '数据库系统概论',
            link: '/database/'
          },
          {
            text: 'MySQL 笔记',
            link: '/mysql/'
          }
        ]
      }
    ],
    sidebar: {
      '/database/': [
        {
          text: '数据库系统概论',
          children: [
            '/database/',
          ]
        }
      ],
      '/mysql/': [
        {
          text: 'MySQL',
          children: [
            {
              text: 'MySQL 基础',
              link: '/mysql/basic/'
            },
            {
              text: 'MySQL 管理',
              link: '/mysql/manage/'
            },
            {
              text: 'MySQL 进阶',
              link: '/mysql/advanced/'
            },
          ]
        }
      ]
    }
  }),
  plugins: [
    mdEnhancePlugin({
      gfm: true,
      container: true,
      linkCheck: true,
      vPre: true,
      tabs: true,
      codetabs: true,
      align: true,
      attrs: true,
      sub: true,
      sup: true,
      footnote: true,
      mark: true,
      imageLazyload: true,
      tasklist: true,
      katex: true,
      mermaid: true,
      delay: 200,
    }),
    searchProPlugin({}),
    copyCodePlugin({
      showInMobile: true,
    }),
  ]
})
