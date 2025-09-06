import React from "react";
import Chart from "react-apexcharts";

function Home() {
    return (
        <Chart
            type="line"
            series= {[
                { name: "Price", data:[1000, 2000, 3000]},
                { name: "Price2", data:[1500, 1000, 2500]},
            ]}
            options={{
                theme: { mode: "dark" },
                chart: {
                    height: "auto",
                    width: '100%',
                    toolbar: { show: false },
                    background: "transparent",
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
                        }
                    }
                }],
                stroke: { curve: "smooth", width: 4 },
                grid: { show: false },
                yaxis: { show: false },
                xaxis: {
                    labels: { show: false },
                    axisTicks: { show: false },
                    axisBorder: { show: false },
                    categories: ["2022-08-09", "2022-08-10", "2022-08-11"],
                    type: "datetime",
                },
                fill: {
                    type: "gradient",
                    gradient: { gradientToColors: ["blue"], stops: [0, 100] },
                },
                colors: ["red"],
                tooltip: {
                    y: { formatter: (value) => `$ ${value.toFixed(2)}` },
                },
            }}
        />
    );
}

export default Home;