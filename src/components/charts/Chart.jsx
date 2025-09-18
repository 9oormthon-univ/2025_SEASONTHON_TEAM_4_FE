import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { useCallback, useRef } from 'react';

const Graph = ({ data = [], minThreshold = 80, maxThreshold = 130 }) => {
    const chartRef = useRef(null);
    const sampleData = [
        { t: '9시', value: 75 },
        { t: '9시 5분', value: 82 },
        { t: '9시 10분', value: 95 },
        { t: '9시 15분', value: 110 },
        { t: '9시 20분', value: 125 },
        { t: '9시 25분', value: 135 },
        { t: '9시 30분', value: 145 },
        { t: '9시 35분', value: 140 },
        { t: '9시 40분', value: 128 },
        { t: '9시 45분', value: 115 },
        { t: '9시 50분', value: 105 },
        { t: '9시 55분', value: 90 },
        { t: '10시', value: 78 },
        { t: '10시 5분', value: 85 },
        { t: '10시 10분', value: 120 },
        { t: '10시 15분', value: 132 },
        { t: '10시 20분', value: 150 },
        { t: '10시 25분', value: 165 },
        { t: '10시 30분', value: 155 },
        { t: '10시 35분', value: 138 },
        { t: '10시 40분', value: 122 },
        { t: '10시 45분', value: 98 },
        { t: '10시 50분', value: 72 },
        { t: '10시 55분', value: 88 },
        { t: '11시', value: 95 },
        { t: '11시 5분', value: 112 },
        { t: '11시 10분', value: 128 },
        { t: '11시 15분', value: 145 },
        { t: '11시 20분', value: 162 },
        { t: '11시 25분', value: 178 },
        { t: '11시 30분', value: 195 },
        { t: '11시 35분', value: 210 },
        { t: '11시 40분', value: 225 },
        { t: '11시 45분', value: 218 },
        { t: '11시 50분', value: 205 },
        { t: '11시 55분', value: 192 },
        { t: '12시', value: 175 },
        { t: '12시 5분', value: 158 },
        { t: '12시 10분', value: 142 },
        { t: '12시 15분', value: 125 },
        { t: '12시 20분', value: 108 },
        { t: '12시 25분', value: 95 },
        { t: '12시 30분', value: 88 },
        { t: '12시 35분', value: 92 },
        { t: '12시 40분', value: 105 },
        { t: '12시 45분', value: 118 },
        { t: '12시 50분', value: 132 },
        { t: '12시 55분', value: 125 }
    ];

    const chartData = data.length > 0 ? data : sampleData;

    // 초기 y축 범위 계산
    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = (maxValue - minValue) * 0.1;

    // 값에 따른 동적 색상 계산
    const getColorForValue = (value) => {
        if (value <= 80) {
            return '#1B3759';
        } else if (value <= 150) {
            return '#00BBA9';
        } else if (value <= 200) {
            return '#FDA296';
        } else {
            return '#C23E2B';
        }
    };

    const createLineGradient = (visibleData = chartData) => {
        const colorStops = [];

        visibleData.forEach((item, index) => {
            const offset = index / (visibleData.length - 1);
            const color = getColorForValue(item.value);

            colorStops.push({ offset, color });
        });

        return new echarts.graphic.LinearGradient(0, 0, 1, 0, colorStops);
    };

    const updateGradientOnZoom = useCallback((params) => {
        if (!chartRef.current) return;

        const chart = chartRef.current.getEchartsInstance();
        const { start, end } = params.batch ? params.batch[0] : params;

        const startIndex = Math.floor((start / 100) * chartData.length);
        const endIndex = Math.ceil((end / 100) * chartData.length);
        const visibleData = chartData.slice(startIndex, endIndex);

        const values = visibleData.map(d => d.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const padding = (maxValue - minValue) * 0.1;

        const newOption = {
            yAxis: {
                min: Math.max(0, minValue - padding),
                max: maxValue + padding,
                animation: false
            },
            series: [{
                lineStyle: {
                    color: createLineGradient(visibleData)
                }
            }]
        };

        chart.setOption(newOption, false, true);
    }, [chartData, minThreshold, maxThreshold]);

    const option = {
        animation: false,
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100,
                zoomOnMouseWheel: true,
                moveOnMouseMove: true
            }
        ],
        xAxis: {
            type: 'category',
            data: chartData.map(d => d.t),
            axisLine: { show: false },
            animation: false,
            axisLabel: {
                fontFamily: 'Pretendard Variable, Pretendard, sans-serif',
                color: '#8E8E8E'
            }
        },
        yAxis: {
            type: 'value',
            min: Math.max(0, minValue - padding),
            max: maxValue + padding,
            splitLine: { show: false },
            animation: false,
            axisLabel: {
                fontFamily: 'Pretendard Variable, Pretendard, sans-serif',
                color: '#8E8E8E'
            }
        },
        series: [
            {
                type: 'line',
                smooth: true,
                symbol: 'none',
                animation: false,
                silent: true,
                data: chartData.map(d => d.value),
                lineStyle: {
                    width: 6,
                    color: createLineGradient(),
                    cap: 'round'
                },
                itemStyle: {
                    color: function(params) {
                        const value = chartData[params.dataIndex]?.value || 0;
                        return getColorForValue(value);
                    },
                    borderWidth: 2,
                    borderColor: '#fff'
                },
                name: '혈당 수치',
                markArea: {
                    silent: true,
                    data: [
                        [
                            {
                                yAxis: minThreshold,
                                itemStyle: {
                                    color: 'rgba(0, 187, 169, 0.1)'
                                }
                            },
                            {
                                yAxis: maxThreshold
                            }
                        ]
                    ]
                }
            }
        ]
    };

    return (
        <div style={{ backgroundColor: 'white', }}>
            <ReactECharts
                ref={chartRef}
                option={option}
                style={{ height: 320, width: '100%' }}
                onEvents={{
                    'dataZoom': updateGradientOnZoom
                }}
            />
        </div>
    );
};

export default Graph;