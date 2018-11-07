/**
 * ssr扩展
 */

export function withSSR() {
	return function adapter(ScreenComponent) {
		// eslint-disable-next-line no-param-reassign
		ScreenComponent.getInitialProps = function getInitialProps({ query }) {
			return query;
		};
		return ScreenComponent;
	};
}
