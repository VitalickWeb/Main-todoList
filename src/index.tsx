import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {store} from "./State/store";
import {Provider} from "react-redux";
import AppWithRedux from "./State/AppWithRedux";

//Даём доступ компонентам к store, используя Provider
//Чтобы react (то есть наши компоненты) могли обращаться к этому store,
//мы должны положить наше приложение внутрь компонента Provider,
// который импортируется из react-redux библиотеки,
//с переданным ему store (это в файле index.tsx):
ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
