// document.js相当于app.html-------这里可以引用一些图形组件，但是不建议，因为无法在这里其他的组件内的所有逻辑都不会被初始化和执行，这些不会被初始化和执行的逻辑代码包括除了 render 之外的所有生命周期钩子函数，
// 例如componnetDidMount、componentWillUpdate，以及一些监听函数，例如 onClick、onMouseOver等------------一些公共组件我们可以写在components/layout.js
// 所以如果你要在_document.js添加额外的组件，请确保这些组件中除了 render之外没有其他的逻辑

import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const {
			html, head, errorHtml, chunks,
		} = renderPage()
		return {
			html, head, errorHtml, chunks,
		}
	}

	render() {
		return (
			<html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<link rel="stylesheet" href="public/css/antd.min.css" />
				</Head>
				<body className="custom_class">
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
