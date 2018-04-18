import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		appendTo: PropTypes.any
	};

	static defaultProps = {
		appendTo: document.body
	};

	static idNum = 0;

	constructor(props) {
		super(props);

		const {appendTo, className, style} = props;
		const id = `portal-${Portal.idNum++}`;
		let element = appendTo.ownerDocument.getElementById(id);

		if (!element) {
			element = appendTo.ownerDocument.createElement('div');
			element.id = id;
			element.className = className;
			element.setAttribute('style', style);
		}

		this._element = element;
	}

	componentDidMount() {
		this.props.appendTo.appendChild(this._element);
	}

	componentWillUnmount() {
		this.props.appendTo.removeChild(this._element);
	}

	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this._element
		);
	}
}

export default Portal;
