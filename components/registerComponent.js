import { Component } from 'react';
import Link from 'next/link';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import request from '../utils/_http';
const FormItem = Form.Item;

class RegisterComponent extends Component {
  state = {
  	CountDown: '获取验证码',
  }
  handleSubmit = (e) => {
  	e.preventDefault();
  	this.props.form.validateFields((err, values) => {
  		if (!err) {
  			console.log('Received values of form: ', values);
  			request.post('http://127.0.0.1:5432/api/register', {
  				username: values.userName,
  				password: values.password,
  				phonenum: values.phone,
  				vcode: values.captcha,
  			})
  				.then(e => {
  					console.log(e);
  				});
  		}
  	});
  }
  validatePassAgain = (rule, value, cb) => {
  	if (this.props.form.getFieldValue('password') === value) {
  		cb();
  	} else {
  		cb('两次输入密码不一致！');
  	}
  }
  validateHasPhone = () => {
  	if (this.props.form.getFieldValue('phone')) {
  		this.props.form.setFields({
  			phone: { value: this.props.form.getFieldValue('phone') },
  		});
  		return true;
  	}
  		this.props.form.setFields({
  			phone: { errors: [ new Error('请输入手机号码再获取验证码') ] },
  		});
  		return false;

  }
  // 60秒倒计时
  countDownFn = () => {
  	if (this.validateHasPhone() && this.state.CountDown === '获取验证码') {
  		this.setState({
  			CountDown: 60,
  		}, () => {
  			console.log(this.state.CountDown);
  			let count = this.state.CountDown;
  			const timer = setInterval(() => {
  				this.setState({
  					CountDown: count--,
  				});
  				if (this.state.CountDown === 0) {
  					this.setState({
  						CountDown: '获取验证码',
  					});
  					clearInterval(timer);
  				}
  			}, 1000);
  		});
  	} else {
  		return;
  	}
  }
  render() {
  	const { getFieldDecorator } = this.props.form;
  	return (
  		<Form layout='vertical' onSubmit={this.handleSubmit} className="login-form">
  			<FormItem className='FormItem'>
  				{getFieldDecorator('userName', {
  					rules: [
  						{ required: true, message: '请输入新的用户名' },
  						{ min: 6, max: 15, message: '用户名长度在 6 到 15 个字符' },
  					],
  					validateTrigger: '',
  				})(
  					<Input
  						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						placeholder="请输入用户名" />
  				)}
  			</FormItem>
  			<FormItem className='FormItem'>
  				{getFieldDecorator('password', {
  					rules: [
  						{ required: true, message: '请设置登录密码' },
  						{ min: 6, max: 15, message: '密码长度在 6 到 15 个字符' },
  					],
  					validateTrigger: '',
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						type="password" placeholder="请输入密码" />
  				)}
  			</FormItem>
  			<FormItem className='FormItem'>
  				{getFieldDecorator('passwordAgain', {
  					rules: [
  						{ required: true, message: '请确认登录密码' },
  						{ validator: this.validatePassAgain },
  					],
  					validateTrigger: '',
  				})(
  					<Input
  						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						type="password"
  						placeholder="请确认密码" />
  				)}
  			</FormItem>
  			<FormItem className='FormItem'>
  				{getFieldDecorator('phone', {
  					rules: [
  						{ required: true, message: '必须输入手机号码' },
  						{ pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '填写正确的手机号' },
  					],
  					validateTrigger: '',
  				})(
  					<Input
  						prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
  						placeholder="请输入手机号码" />
  				)}
  			</FormItem>
  			<FormItem className='FormItem'>
  				<Row type="flex" justify="space-between">
  					<Col span={12}>
  						{getFieldDecorator('captcha', {
  							rules: [
  								{ required: true, message: '必须输入短信验证码' },
  								{ pattern: /^[0-9]{4}$/, message: '请填写4位的验证码' },
  							],
  							validateTrigger: '',
  						})(
  							<Input placeholder="请输入验证码" />
  						)}
  					</Col>
  					<Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} span={10}>
  						<Button
  							onClick={this.countDownFn}
  							style={{ width: '100%' }}>
  							{this.state.CountDown === '获取验证码' ? this.state.CountDown : `${this.state.CountDown}s`}
  						</Button>
  					</Col>
  				</Row>
  			</FormItem>
  			<FormItem className='lastFormItem'>
  				<Button
  					type="primary"
  					htmlType="submit"
  					style={{ marginBottom: '10px' }}
  					className="login-form-button">
            注册
  				</Button>
  				<Row>
  					<Col offset={1}>
              若注册完成可点击 <Link href="/"><a>登录</a></Link>
  					</Col>
  				</Row>
  			</FormItem>
  			<style jsx global>
  				{`
            .lastFormItem {
              margin-bottom: 0 !important;
            }
            .FormItem {
              margin-bottom: 16px !important;
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
const RegisterForm = Form.create()(RegisterComponent);
export default RegisterForm;
