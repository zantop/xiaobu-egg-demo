import React from "react";

import { withSSR } from "./_ssr";

import { Card } from 'antd'

const HomeScreen = () => (
  <Card>
    <p>Welcome</p>
    <p>
      <a href="javascript:">Hahaha</a>
    </p>
  </Card>
);

export default withSSR()(HomeScreen);
