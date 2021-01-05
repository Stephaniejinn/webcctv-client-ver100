import React from 'react';
import { Layout } from 'antd';
import './style.less';

const { Header} = Layout;

const myHeader = () => {
  return (
      <Header className="site-layout-background" style={{ padding: 0 }} />
    );
};

export default myHeader;