import React from 'react';
import { Liquid } from '@ant-design/charts';

const MyLiquid = () => {
    var config = {
        percent: 0.25,
        statistic: {
            content: {
                style: {
                    fontSize: 16,
                    fill: 'black',
                },
            },
        },
    };
    return <Liquid {...config}/>;
};
export default MyLiquid;