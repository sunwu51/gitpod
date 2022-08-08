import ReactDOM from "react-dom";
import React from "react";
import { useState } from "react";
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import {MyChart} from './charts';
import {actions, reducer} from './slice1';
import {cactions, creducer} from './slice2';


const store = configureStore({
    reducer: {
      r1: reducer,
      r2: creducer,
    }
});

function MyC(props) {
    const dispatch = useDispatch();
    const count = useSelector(state=>state.r1.count);

    return <>
        <h1 onClick={()=>dispatch(actions.add(2))}>{count}</h1>
    </>
}
let base = +new Date(1988, 9, 3);
let oneDay = 24 * 3600 * 1000;
let data = [[base, Math.random() * 300]];
for (let i = 1; i < 20000; i++) {
  let now = new Date((base += oneDay));
  data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
}
let option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  title: {
    left: 'center',
    text: 'Large Ara Chart'
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  dataZoom: [
    // {
    //   type: 'inside',
    //   start: 0,
    //   end: 20
    // },
    {
      start: 0,
      end: 20
    }
  ],
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      symbol: 'none',
      areaStyle: {},
      data: data
    }
  ]
};


const Chart = (props) =>{
    const dispatch = useDispatch();
    useSelector(state=>state.r1);
    const onzoom = (params) => {
        console.log(params)
        dispatch(actions.add(params.start));
    }
    console.log(1)
    return <MyChart option = {option} onzoom={onzoom}></MyChart>
}
ReactDOM.render(
    <Provider store={store}>
        <MyC text="dfsa"></MyC>
        <Chart></Chart>
    </Provider>,
    document.getElementById('root')
);