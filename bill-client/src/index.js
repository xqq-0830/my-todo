import React from "react";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom/client";
import { ConfigProvider, notification } from "antd";
// import locale from "antd/es/date-picker/locale/zh_CN";
// import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";

import { Page } from "@/components/Page";

import globalStore from "./store/index";
import { routers } from "./routers/index";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import variables from "@/assets/style/variable.less";
// // 根据路由配置生成路由
// const routerGenerator = () =>
//   routers.map(({ component, path, ...other }) => {
//     const Routes = component.then(function (raw) {
//       var Component = raw.default || raw;
//       return <Route component={Component} path={path} {...other}></Route>;
//     });
//     return <Routes />;
//   });

// 全局配置
console.log("var", variables);
const globalConfig = {
  locale: zhCN, // 本地化语言
  theme: {
    token: {
      colorPrimary: variables["theme-color"]
    },
    Menu: variables["theme-color"]
  }
};

// 提醒框
notification.config({
  placement: "bottomRight",
  bottom: 30,
  duration: 2,
  rtl: false // 一种阅读模式 right to left
});

const App = (app) => {
  return (
    <Switch>
      {routers.map(
        ({ component: Comp, unauthorized, children, path, ...other }) => {
          return (
            <Route {...other} key={path} path={path}>
              {unauthorized && <Comp />}
              {!unauthorized && (
                <Page>
                  <Comp />
                </Page>
              )}
            </Route>
          );
        }
      )}
      <Redirect from='/' to='/bill-chart' exact />
    </Switch>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Provider store={globalStore}>
      <ConfigProvider {...globalConfig}>
        <App />
      </ConfigProvider>
    </Provider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
