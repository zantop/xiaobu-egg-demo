import React from 'react'
import RegisterForm from '../components/registerComponent'
import { Card } from 'antd'

class RegisterPage extends React.Component {
	render() {
  	return (
  		<div className='registerBox'>
  			<Card
  				title='注册'
  				headStyle={{ textAlign: 'center', fontSize: '18px' }}
  				className='cardStyle'>
  				<RegisterForm />
  			</Card>
  			<style jsx global>
  				{`
            .registerBox{
              position: relative;
              width: 100%;
              height: 100vh;
              background-color: #485a71f2;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              box-sizing: border-box;
              padding-right: 150px;
              background-size: 350px;
              background-image: url('/public/images/445faa1e5d5981167dc5b65f3f117cc4.png');
              .cardStyle{
                width: 360px;
                box-shadow: 2px 2px 9px 1px rgba(0, 0, 0, .3);
              }
            }
          `}
  			</style>
  		</div>
  	)
	}
}

export default RegisterPage
