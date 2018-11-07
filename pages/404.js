import React from 'react';

import { withSSR } from './_ssr';

import { Card } from 'antd';

const HomeScreen = () => (
	<Card>
		<h3>404 NOT FOUND</h3>
	</Card>
);

export default withSSR()(HomeScreen);
