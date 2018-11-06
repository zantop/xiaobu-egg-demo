// 关于在page下的_error页面， 它可以覆盖默认的错误页面，一切可以由你来自定义，但那如果你在某个page中想用next提供的默认错误页面时候你可以引入next/error，
// 当然如果还是想用最近编写的错误页面的话就像引入组件一样引入_error

import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Error extends Component {
	static getInitialProps ({ res, jsonPageRes }) {
		const statusCode = res ? res.statusCode : jsonPageRes ? jsonPageRes.status : null
		return { statusCode }
	}
  static propTypes = {
  	statusCode: PropTypes.any
  }
  render () {
  	return (
  		<div>
  			<p>{ this.props.statusCode ? `这是一个错误码为${this.props.statusCode}的错误` : '这是一个没有statuscode的错误，即客户端的错误' }</p>
  		</div>
  	)
  }
}
