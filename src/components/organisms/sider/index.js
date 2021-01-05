import React from 'react';
import { Layout, Menu } from 'antd';
import {
  FundProjectionScreenOutlined,
  PieChartOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  PicRightOutlined,
} from '@ant-design/icons';
import logo from '../../../assets/logo/logoBlueWN.png';
import './style.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

class myMenu extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} theme="light">
            <img src={logo} className="logo" alt="logo"/>
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              실시간 영상
            </Menu.Item>
            <Menu.Item key="2" icon={<FundProjectionScreenOutlined />}>
              실시간 데이터
            </Menu.Item>
            <SubMenu key="sub1" icon={<BarChartOutlined />} title="누적 통계 데이터 분석">
              <Menu.Item key="3" icon={<PicRightOutlined />}>일간 별</Menu.Item>
              <Menu.Item key="4" icon={<PicRightOutlined />}>주간 별</Menu.Item>
              <Menu.Item key="5" icon={<PicRightOutlined />}>월간 별</Menu.Item>
            </SubMenu>
              <Menu.Item key="6" icon={<FileTextOutlined />}>데이터 조회 및 다운로드</Menu.Item>
              <Menu.Item key="7" icon={<PieChartOutlined />}>통계 비교</Menu.Item>
          </Menu>
        </Sider>
    );
  }
};

export default myMenu;