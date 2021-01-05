import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

const DashLine = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
            console.log('fetch data failed', error);
        });
    };
    var config = {
        data: data,
        xField: 'date',
        yField: 'value',
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                        return ''.concat(s, ',');
                    });
                },
            },
        },
        seriesField: 'type',
        color: function color(_ref) {
            var type = _ref.type;
            return type === 'register' ? '#F4664A' : type === 'download' ? '#30BF78' : '#FAAD14';
        },
        lineStyle: function lineStyle(_ref2) {
            var type = _ref2.type;
            if (type === 'register') {
                return {
                    lineDash: [4, 4],
                    opacity: 1,
                };
            }
            return { opacity: 0.5 };
        },
    };
    return <Line {...config}/>;
};
export default DashLine;