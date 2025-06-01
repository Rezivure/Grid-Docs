import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Grid Documentation',
  tagline: 'Private, encrypted location sharing',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.mygrid.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Rezivure', // Usually your GitHub org/user name.
  projectName: 'Grid-Docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Rezivure/Grid-Docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'changelog',
        path: 'changelog',
        routeBasePath: 'changelog',
        sidebarPath: require.resolve('./sidebarsChangelog.ts'),
        editUrl: 'https://github.com/Rezivure/Grid-Docs/tree/main/changelog/',
        sidebarItemsGenerator: async function ({defaultSidebarItemsGenerator, ...args}) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          return sidebarItems;
        },
      },
    ],
  ],
  
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Grid Documentation',
      logo: {
        alt: 'Grid Logo',
        src: 'img/logo-svg.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'changelog', 
          position: 'left',
          label: 'Changelog',
          docsPluginId: 'changelog',
        },
        {
          href: 'https://github.com/orgs/Rezivure/repositories',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },    
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Docs',
              to: '/docs/intro',
            },
          ],
        }, 
        {
          title: 'Community',
          items: [
            {
              label: 'Grid Website',
              href: 'https://mygrid.app',
            },
            {
              label: 'Matrix Chat',
              href: 'https://matrix.to/#/#grid:matrix.org',
            },
            {
              label: 'X',
              href: 'https://x.com/mygridhq',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://rezivure.io',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/orgs/Rezivure/repositories',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rezivure, LLC. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
