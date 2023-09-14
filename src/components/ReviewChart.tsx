import '../App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import '../css/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewChart = ({ bno }: any) => {
    let [series, setSeries] = useState({ name: '★', data: [0, 0, 0, 0, 0] });

    const options: ApexOptions = {
        fill: {
            colors: ['#ffd02e'],
            opacity: 1,
        },
        chart: {
            height: '400px',
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                dataLabels: {
                    position: 'top',
                },
                barHeight: '50',
                columnWidth: '60%',
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                fontFamily: 'guremgothic30',
                fontSize: '18px',
                colors: ['#ffffff'],
            },
        },
        xaxis: {
            categories: ['⭐1', '⭐2', '⭐3', '⭐4', '⭐5'],
            position: 'bottom',
            axisBorder: {
                show: false,
            },
            // crosshairs: {
            //     fill: {
            //         type: 'gradient',
            //         gradient: {
            //             colorFrom: '#ffd02e',
            //             colorTo: '#BED1E6',
            //             stops: [0, 100],
            //             opacityFrom: 1,
            //             opacityTo: 1,
            //         },
            //     },
            // },
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    fontFamily: 'guremgothic30',
                    fontSize: '20',
                    colors: ['#737373', '#737373', '#737373', '#737373', '#737373'],
                },
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                },
                style: {
                    fontFamily: 'gureumgothic30',
                    fontSize: '20',
                },
            },
        },
        title: {
            text: '별점 현황',
            align: 'center',
            style: {
                fontFamily: 'gureumgothic50',
                fontSize: '20',
            },
        },
    };

    useEffect(() => {
        Axios.get(`http://localhost:8000/reviewChart/${bno}`)
            .then((res) => {
                return res.data;
            })
            .then(async (data) => {
                setSeries({ name: '인원', data: data });
            });
    }, []);

    return (
        <>
            <div className="area_reviewChart">
                <ApexCharts
                    options={options}
                    series={[{ name: '인원', data: series.data }]}
                    type="bar"
                    height={400}
                ></ApexCharts>
            </div>
        </>
    );
};

export default ReviewChart;
