import React, { Children, cloneElement, Component, PropTypes } from 'react';
import PortalPopper from './portal-popper';
import onClickOutside from 'react-onclickoutside';

const noop = () => false;

class Tooltip extends Component {
	constructor(...props) {
		super(...props);

		this.state = {
			shouldShow: false
		};
		this.triggers = {
			hover: {
				onMouseOver: () => {
					if (this.closeTimeout) {
						clearTimeout(this.closeTimeout);
					} else {
						this.openTimeout = setTimeout(() => {
							this.showHandler(true);
							this.openTimeout = null;
						}, props[0].hoverOpenDelay);
					}
				},
				onMouseOut: () => {
					if (this.openTimeout) {
						clearTimeout(this.openTimeout);
					} else {
						this.closeTimeout = setTimeout(() => {
							this.showHandler(false);
							this.closeTimeout = null;
						}, props[0].hoverCloseDelay);
					}
				}
			},
			click: {
				onClick: () => this.showHandler(!this.state.shouldShow)
			},
			'click-close': {
				onClick: () => this.showHandler(false)
			},
			focus: {
				onFocus: () => this.showHandler(true),
				onBlur: () => this.showHandler(false)
			}
		};
	}

	showHandler(shouldShow) {
		this.setState({shouldShow});

		if (shouldShow) {
			this.props.onOpen();
		} else {
			this.props.onClose();
		}
	}

	_popper() {
		const {alwaysShow, title, placement, addArrow, className} = this.props;

		if (alwaysShow !== true && (!this.state.shouldShow || alwaysShow === false)) {
			return null;
		}

		return (
			<PortalPopper
				getTargetNode={() => this.refs.target}
				title={title}
				placement={placement}
				addArrow={addArrow}
				className={className}
				ref="popper"
			/>
		);
	}

	handleClickOutside() {
		const {trigger, rootClose} = this.props;

		if (rootClose && ~trigger.indexOf('click')) {
			this.showHandler(false);
		}
	}

	createEvents(trigger) {
		let events = {};

		[...new Set(trigger)].forEach(item => {
			events = Object.assign(events, this.triggers[item]);
		});

		return events;
	}

	render() {
		const {alwaysShow, children, trigger, holderClassName} = this.props;
		const actionProps = alwaysShow ? {} : this.createEvents(trigger);

		return (
			<span className={holderClassName}>
				{cloneElement(Children.only(children), {
					ref: 'target',
					...actionProps
				})}
				{this._popper()}
			</span>
		)
	}
}

Tooltip.propTypes = {
	className: PropTypes.string,
	holderClassName: PropTypes.string,
	placement: PropTypes.string,
	title: PropTypes.node.isRequired,
	alwaysShow: PropTypes.bool,
	addArrow: PropTypes.bool,
	rootClose: PropTypes.bool,
	trigger: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus', 'click-close'])),
	hoverOpenDelay: PropTypes.number,
	hoverCloseDelay: PropTypes.number,
	onOpen: PropTypes.func,
	onClose: PropTypes.func
};

Tooltip.defaultProps = {
	placement: 'top',
	trigger: ['hover'],
	hoverOpenDelay: 400,
	hoverCloseDelay: 100,
	onOpen: noop,
	onClose: noop
};

export default onClickOutside(Tooltip);
