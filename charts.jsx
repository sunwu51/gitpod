import {useRef,useEffect} from 'react';
import { init, getInstanceByDom} from 'echarts';
import ReactDOM from "react-dom";
import React from "react";


export function MyChart(props) {
    const chartRef = useRef(null);
    const {option} = props;

    useEffect(()=>{
        let chart = init(chartRef.current);
        if(props.onzoom) {
            chart.on("datazoom", props.onzoom)
        }
        return ()=>{
            chart.dispose();
        }
    }, []);

    useEffect(()=>{
        if (chartRef.current !== null) {
            const chart = getInstanceByDom(chartRef.current);
            chart.setOption(option)
        }
    }, [option]);

    return <div ref={chartRef} style={{width:"800px", height:"300px"}}></div>
}