import '../App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import '../css/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewChart = ({ bno }: any) => {
    let [series, setSeries] = useState({ name: '★', data: [0, 0, 0, 0, 0] });
    // let chartHeight = '400px';

    const [windowWidth, setWindowWidth] = useState({
        width: window.innerWidth,
    });

    const [chartHeight, setChartHeight] = useState({
        height: '400px',
    });

    const useWindowSizeCustom = () => {
        useEffect(() => {
            if (typeof window !== 'undefined') {
                const handleResize = () => {
                    setWindowWidth({
                        width: window.innerWidth,
                    });
                };

                window.addEventListener('resize', handleResize);

                // 초기값을 설정할 수 있도록 handleResize 함수를 한 번 실행시킨다.
                handleResize();

                console.log('ddddd');

                // 이벤트 리스너를 제거하여 이벤트 리스너가 리사이즈될 때마다 계속해서 생겨나지 않도록 처리한다. (clean up)
                return () => window.removeEventListener('resize', handleResize);
            } else {
                return () =>
                    window.removeEventListener('resize', () => {
                        return null;
                    });
            }
        }, []); // 컴포넌트가 처음 마운트 될때와 언마운트 될 때 실행

        return windowWidth;
    };

    useWindowSizeCustom();

    useEffect(() => {
        console.log('nn');
        if (windowWidth.width < 650) {
            console.log('650<');
            setChartHeight({
                height: '250px',
            });
        } else if (windowWidth.width >= 650) {
            setChartHeight({
                height: '400px',
            });
        }
    }, [windowWidth]);

    const options: ApexOptions = {
        fill: {
            colors: ['#ffd02e'],
            opacity: 1,
        },
        chart: {
            height: chartHeight.height,
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
        Axios.get(`/api/reviewChart/${bno}`)
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
                    height={chartHeight.height}
                ></ApexCharts>
            </div>
        </>
    );
};

export default ReviewChart;
