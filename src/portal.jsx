import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { render } from 'react-dom';

class Portal extends Component {
	static propTypes = {
		appendTo: PropTypes.any
	};

	static defaultProps = {
		appendTo: document.body
	};

	static idNum = 0;

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

	componentDidUpdate() {
		render((
			<div ref={this.onSetRef} {..._.omit(this.props, 'children', 'appendTo')}>
				{this.props.children}
			</div>
		), this._element);
	}

	componentWillUnmount() {
		this.props.appendTo.removeChild(this._element);
	}

	onSetRef = (ref) => {
		this.domNode = ref;
	};

	render() {
		return null;
	}
}

export default Portal;
