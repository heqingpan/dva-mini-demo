

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
//import { configureStore} from '@reduxjs/toolkit';
import { Provider,connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import * as effects from 'redux-saga/effects';
import './App.css'

import {buildDva} from 'dva-mini'
import CountModel from './model/count'
import UserModel from './model/user'
import MonitorModel from './model/monitor'

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

let {rootReducer,rootSaga} = buildDva([
    CountModel,
    UserModel,
    MonitorModel
],effects)
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
/*
const store = configureStore({
    reducer:rootReducer, 
    enhancers:[applyMiddleware(sagaMiddleware, logger)]
});
*/
sagaMiddleware.run(rootSaga);

const Monitor = connect(({monitor})=>({lastEvents:monitor.lastEvents})) (function(props){
    console.log(props,props.lastEvents);
    return (
        <div className='monitor'>
            <div className='title'>last monitor event</div>
        {
            props.lastEvents.map((item)=>{
                return (
                    <div key={item.id}>
                        <span>{item.time}</span>|
                        <span>{item.type}</span>|
                        <span>{item.msg}</span>
                    </div>
                )
            })
        }
        </div>
    )
})

const AppPage = connect(({ count }) => ({
    count
  }))(function(props) {
    return (
      <div>
        <h2>{ props.count }</h2>
        <button key="add" onClick={() => { props.dispatch({type: 'count/add_effect',payload:2})}}>+</button>
        <button key="minus" onClick={() => { props.dispatch({type: 'count/minus_effect'})}}>-</button>
        <Monitor/>
      </div>
    );
  });

const App = () => 
  <Provider store={store}>
    <AppPage />
  </Provider>

export default App
