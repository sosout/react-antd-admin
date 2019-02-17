import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider, connect } from "react-redux";
import { IntlProvider, addLocaleData } from "react-intl";
import zh from "react-intl/locale-data/zh";
import en from "react-intl/locale-data/en";
import { LocaleProvider } from "antd";
import antdEnUS from "antd/lib/locale-provider/en_US";
import antdZhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import PageRouters from "@/routers/PageRouters";
import MySpin from "@/containers/MySpin";
import enUS from "@/locales/en-US.js";
import zhCN from "@/locales/zh-CN.js";
import config from "@/utils/config";
import store from "./store";

global.Config = config;

const langMap = {
  en: enUS,
  zh: zhCN
};

const antdLangMap = {
  en: antdEnUS,
  zh: antdZhCN
};

addLocaleData([...en, ...zh]);

@connect(state => {
  return {
    local: state.app.local
  };
})
class App extends React.Component {
  componentDidMount() {
    const loading = document.getElementById("StartLoading");
    document.body.removeChild(loading);
  }
  render() {
    const { local } = this.props;
    moment.locale(local);
    console.log(store);
    return (
      <IntlProvider locale={local} messages={langMap[local]} key={local}>
        <LocaleProvider locale={antdLangMap[local]}>
          <MySpin pageRouters={PageRouters} />
        </LocaleProvider>
      </IntlProvider>
    );
  }
}

const HotApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default hot(HotApp);
