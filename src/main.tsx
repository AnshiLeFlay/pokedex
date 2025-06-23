import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import { store } from "./store/index";
import { Provider } from "react-redux";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Layout>
                <Header></Header>
                <Content>
                    <App />
                </Content>
                <Footer></Footer>
            </Layout>
        </Provider>
    </React.StrictMode>
);
