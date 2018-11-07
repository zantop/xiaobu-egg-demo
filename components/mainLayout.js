import React from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content } = Layout;
const MenuItem = Menu.Item;

class mainPage extends React.Component {
  clickMenu = (obj) => {
  	console.log(obj);
  }
  render() {
  	const { children } = this.props;
  	return (
  		<Layout>
  			<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
  				<div className="logo" />
  				<Menu
  					theme="dark"
  					mode="horizontal"
  					defaultSelectedKeys={[ '1' ]}
  					style={{ lineHeight: '64px' }}
  					onClick={this.clickMenu}
  				>
  					<MenuItem key="1">tab one</MenuItem>
  					<MenuItem key="2">tab two</MenuItem>
  					<MenuItem key="3">tab three</MenuItem>
  				</Menu>
  			</Header>
  			<Content style={{ marginTop: 64 }}>
  				<div style={{ background: '#fff', padding: 24, minHeight: 680 }}>
  					{children}
  				</div>
  			</Content>
  		</Layout>
  	);
  }
}

export default mainPage;
