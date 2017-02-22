import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
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
	constructor(...props) {
		super(...props);

		this.state = {
			arrowProps: initialArrowProps,
			popperProps: initialPopperProps
		};
	}

	componentDidMount() {
		this.popper = new this.props.Popper(this.props.getTargetNode(), this.refs.popper.domNode, {
			content: this.props.title,
			placement: this.props.placement,
			modifiers: {
				applyStyle: {
					enabled: true
				},
				arrow: {
					element: this.refs.arrow
				}
			}
		});

		this.popper.onUpdate = (data) => {
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
			this.setState(newState);
		};

		this.popper.update();
	}

	componentWillUnmount() {
		this.isUnmounted = true;
		this.popper && this.popper.destroy();
	}

	_getPopperStyle() {
		const left = Math.round(this.state.popperProps.left);
		const top = Math.round(this.state.popperProps.top);
		const transform = `translate3d(${left}px, ${top}px, 0)`;

		return {
			position: this.state.popperProps.position,
			transform,
			WebkitTransform: transform
		};
	}

	_getArrowStyle() {
		const left = _.isNumber(this.state.arrowProps.left) ? Math.round(this.state.arrowProps.left) : null;
		const top = _.isNumber(this.state.arrowProps.top) ? Math.round(this.state.arrowProps.top) : null;

		return {
			left,
			top
		};
	}

	render() {
		const {placement, title, addArrow, className} = this.props;

		return (
			<Portal ref="popper" className={`ignore-react-onclickoutside react-tooltip react-tooltip-${placement} ${className}`} style={this._getPopperStyle()}>
				{title}
				{addArrow && <div ref="arrow" className="react-tooltip-arrow" style={this._getArrowStyle()}></div>}
			</Portal>
		)
	}
}

PortalPopper.propTypes = {
	className: PropTypes.string,
	placement: PropTypes.string.isRequired,
	getTargetNode: PropTypes.func.isRequired,
	title: PropTypes.node.isRequired,
	addArrow: PropTypes.bool
};

PortalPopper.defaultProps = {
	Popper,
	addArrow: true,
	className: ''
};

export default PortalPopper;
