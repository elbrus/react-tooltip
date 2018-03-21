import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Popper from 'popper.js';

import Portal from './portal';

const initialArrowProps = {
	left: 0,
	top: 0
};

const initialPopperProps = {
	left: 0,
	position: 'absolute',
	top: 0
};

class PortalPopper extends Component {
	static propTypes = {
		className: PropTypes.string,
		placement: PropTypes.string.isRequired,
		getTargetNode: PropTypes.func.isRequired,
		title: PropTypes.node.isRequired,
		addArrow: PropTypes.bool,
		appendTo: PropTypes.any,
		Popper: PropTypes.any,
		boundary: PropTypes.node
	};

	static defaultProps = {
		className: '',
		addArrow: true,
		Popper
	};

	state = {
		arrowProps: initialArrowProps,
		popperProps: initialPopperProps,
		flipped: false
	};

	componentDidMount() {
		const {getTargetNode, title, placement, boundary} = this.props;

		this.popper = new this.props.Popper(getTargetNode(), this.refs.portal._element, {
			content: title,
			placement,
			modifiers: {
				arrow: {
					element: this.refs.arrow
				},
				preventOverflow: {
					boundariesElement: boundary
				}
			},
			onCreate: this._updateData,
			onUpdate: this._updateData
		});

		this.popper.scheduleUpdate();
	}

	componentDidUpdate (prevProps) {
		if (prevProps.updateCue !== this.props.updateCue) {
			this.popper.scheduleUpdate();
		}
	}

	componentWillUnmount() {
		this.isUnmounted = true;
		this.popper && this.popper.destroy();
	}

	_getPopperStyle() {
		const {left, top, position} = this.state.popperProps;
		const transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;

		return {
			position,
			transform,
			WebkitTransform: transform
		};
	}

	_getArrowStyle () {
		const {left, top} = this.state.arrowProps;

		return {
			left: this._getArrowProp(left),
			top: this._getArrowProp(top)
		}
	}

	_getArrowProp (position) {
		return _.isNumber(position) ? Math.round(position) : null;
	}

	_updateData = (data) => {
		if (this.isUnmounted) {
			return;
		}

		const newState = {};

		if (data.offsets.arrow) {
			newState.arrowProps = data.offsets.arrow;
		}

		if (data.offsets.popper) {
			newState.popperProps = data.offsets.popper;
		}

		if (data.flipped != null) {
			newState.flipped = data.flipped;
		}

		this.setState(newState);
	};

	render() {
		const {placement, title, addArrow, className, appendTo} = this.props;
		const flippedClass = this.state.flipped ? 'react-tooltip-flipped' : '';

		return (
			<Portal
				ref="portal"
				className={`ignore-react-onclickoutside react-tooltip react-tooltip-${placement} ${className} ${flippedClass}`}
				style={this._getPopperStyle()}
				appendTo={appendTo}
			>
				<div className="react-tooltip-text">{title}</div>
				{addArrow && <div ref="arrow" className="react-tooltip-arrow" style={this._getArrowStyle()}></div>}
			</Portal>
		)
	}
}

export default PortalPopper;
