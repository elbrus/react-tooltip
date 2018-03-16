import _ from 'lodash'
import React, { Component } from 'react'
import { render } from 'react-dom'

class Portal extends Component {
	componentDidMount() {
		const {appendTo} = this.props;
		const id = `portal-${Portal.idNum++}`;
		let element = appendTo.ownerDocument.getElementById(id);

		if (!element) {
			element = appendTo.ownerDocument.createElement('div');
			element.id = id;
			appendTo.appendChild(element);
		}

		this._element = element;
		this.componentDidUpdate();
	}

	componentWillUnmount() {
		this.props.appendTo.removeChild(this._element);
	}

	componentDidUpdate() {
		render((
			<div ref={ref => {
				this.domNode = ref;
			}} {..._.omit(this.props, 'children', 'appendTo')}>
				{this.props.children}
			</div>
		), this._element);
	}

	render() {
		return null;
	}
}

Portal.idNum = 0;

Portal.defaultProps = {
	appendTo: document.body
};

export default Portal;
