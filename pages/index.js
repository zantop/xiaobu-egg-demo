import React from 'react'
import LoginForm from '../components/loginComponent'
import { Card } from 'antd'

import { withSSR } from "./_ssr";
// import request from '../utils/_http'
// import fetch from 'isomorphic-unfetch'

class Index extends React.Component {
	// static async getInitialProps () {
	// 	const res = await request.get('https://api.tvmaze.com/search/shows?q=batman')
	// 	console.log(res)
	// }
	render () {
 	return (
 		<div className='loginBox'>
 			<Card className='cardStyle'>
 				<LoginForm />
 			</Card>
 			<style jsx global>
 				{`
            .loginBox{
              position: relative;
              width: 100%;
              height: 100vh;
              background-color: #484845;
              .cardStyle{
                width: 330px;
                position: absolute;
                top: 50%;
                margin-top: -150px;
                right: 160px;
              }
            }
          `}
 			</style>
 		</div>
 	)
	}
}

export default withSSR()(Index);