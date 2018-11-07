import { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import Link from 'next/link';
import request from '../utils/_http';
const FormItem = Form.Item;

class LoginComponent extends Component {
  handleSubmit = (e) => {
  	e.preventDefault();
  	this.props.form.validateFields((err, values) => {
  		if (!err) {
  			console.log('Received values of form: ', values);
  			request.post('http://127.0.0.1:5432/api/register', {
  				username: values.userName,
  				password: values.password,
  			})
  				.then(e => {
  					console.log(e);
  				});
  		}
  	});
  }

  render() {
  	const { getFieldDecorator } = this.props.form;
  	return (
  		<Form layout='vertical' onSubmit={this.handleSubmit} className="login-form">
  			<FormItem>
  				{getFieldDecorator('userName', {
  					rules: [
  						{ required: true, message: '请输入您的用户名' },
  						{ min: 6, max: 15, message: '用户名长度在 6 到 15 个字符' },
  					],
  					validateTrigger: '',
  				})(
  					<Input
  						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						placeholder="请输入用户名" />
  				)}
  			</FormItem>
  			<FormItem>
  				{getFieldDecorator('password', {
  					rules: [
  						{ required: true, message: '请输入登录密码' },
  						{ min: 6, max: 15, message: '密码长度在 6 到 15 个字符' },
  					],
  					validateTrigger: '',
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						type="password"
  						placeholder="请输入登录密码" />
  				)}
  			</FormItem>
  			<FormItem className='lastFormItem'>
  				<Button
  					type="primary"
  					htmlType="submit"
  					style={{ marginBottom: '10px' }}
  					className="login-form-button">
            登录
  				</Button>
  				<Row>
  					<Col offset={1}>
              点击立刻 <Link href="/register"><a>注册</a></Link>
  					</Col>
  				</Row>
  			</FormItem>
  			<style jsx global>
  				{`
            .lastFormItem {
              margin-bottom: 0 !important;
            }
            .login-form {
              max-width: 300px;
            }
            .login-form-forgot {
              float: right;
            }
            .login-form-button {
              width: 100%;
            }
          `}
  			</style>
  		</Form>
  	);
  }
}
const LoginForm = Form.create()(LoginComponent);
export default LoginForm;
