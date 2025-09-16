import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { useCallback, useRef } from 'react';

const Graph = ({ data = [], minThreshold = 80, maxThreshold = 130 }) => {
    const chartRef = useRef(null);
    const sampleData = [
        { t: '09:00', value: 75 },
        { t: '09:05', value: 82 },
        { t: '09:10', value: 95 },
        { t: '09:15', value: 110 },
        { t: '09:20', value: 125 },
        { t: '09:25', value: 135 },
        { t: '09:30', value: 145 },
        { t: '09:35', value: 140 },
        { t: '09:40', value: 128 },
        { t: '09:45', value: 115 },
        { t: '09:50', value: 105 },
        { t: '09:55', value: 90 },
        { t: '10:00', value: 78 },
        { t: '10:05', value: 85 },
        { t: '10:10', value: 120 },
        { t: '10:15', value: 132 },
        { t: '10:20', value: 150 },
        { t: '10:25', value: 165 },
        { t: '10:30', value: 155 },
        { t: '10:35', value: 138 },
        { t: '10:40', value: 122 },
        { t: '10:45', value: 98 },
        { t: '10:50', value: 72 },
        { t: '10:55', value: 88 }
    ];

    const chartData = data.length > 0 ? data : sampleData;

    // 초기 y축 범위 계산
    const values = chartData.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = (maxValue - minValue) * 0.1;

    // 값에 따른 동적 색상 계산
    const getColorForValue = (value) => {
        if (value >= minThreshold && value <= maxThreshold) {
            // 정상 범위 (80-130): 파란색 계열
            return '#7BB7FF';
        } else {
            // 비정상 범위: 주황색 계열
            return '#FDA296';
        }
    };

    const createLineGradient = (visibleData = chartData) => {
        const colorStops = [];

        visibleData.forEach((item, index) => {
            const offset = index / (visibleData.length - 1);
            let color;

            if (item.value >= minThreshold && item.value <= maxThreshold) {
                color = '#7BB7FF';
            } else {
                color = '#FDA296';
            }

            colorStops.push({ offset, color });

            if (index < visibleData.length - 1) {
                const current = item.value;
                const next = visibleData[index + 1].value;
                const currentInRange = current >= minThreshold && current <= maxThreshold;
                const nextInRange = next >= minThreshold && next <= maxThreshold;

                if (currentInRange !== nextInRange) {
                    const midOffset = (offset + (index + 1) / (visibleData.length - 1)) / 2;
                    colorStops.push({
                        offset: midOffset,
                        color: '#B8A9FF' // 보라색 전환색
                    });
                }
            }
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
            animation: false
        },
        yAxis: {
            type: 'value',
            min: Math.max(0, minValue - padding),
            max: maxValue + padding,
            splitLine: { show: false },
            animation: false
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
                                    color: 'rgba(123, 183, 255, 0.08)'
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