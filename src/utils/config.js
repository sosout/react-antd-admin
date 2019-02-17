/**
 * global configuration
 * @type {{copyright: string, logoPath: string, siteName: string, i18n: {defaultLanguage: string, languages: *[]}}}
 */
export default {
  localKey: "app_local",
  siteName: "React Admin",
  copyright: `react-antd-admin ©${new Date().getFullYear()} Created by heller.sun@foxmail.com`,
  logoPath: "/logo.svg",
  adminBasePath: "/app",

  /* I18n configuration */
  i18n: {
    languages: [
      {
        key: "en",
        title: "English",
        flag: "/america.svg"
      },
      {
        key: "zh",
        title: "中文",
        flag: "/china.svg"
      }
    ],
    defaultLanguage: "en"
  }
};
