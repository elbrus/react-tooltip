import PropTypes from 'prop-types';
import React, { Children, cloneElement, Component } from 'react';
import onClickOutside from 'react-onclickoutside';

import PortalPopper from './portal-popper';

const noop = () => false;

class Tooltip extends Component {
	static propTypes = {
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

	static defaultProps = {
		placement: 'top',
		trigger: ['hover'],
		hoverOpenDelay: 400,
		hoverCloseDelay: 100,
		onOpen: noop,
		onClose: noop
	};

	state = {
		shouldShow: false
	};

	componentWillMount() {
		this.triggers = {
			hover: {
				onMouseOver: this.onMouseOver,
				onMouseOut: this.onMouseOut
			},
			click: {
				onClick: this.onToggleHandler
			},
			'click-close': {
				onClick: this.onHideHandler
			},
			focus: {
				onFocus: this.onShowHandler,
				onBlur: this.onHideHandler
			}
		};
	}

	onMouseOver = () => {
		if (this.closeTimeout) {
			clearTimeout(this.closeTimeout);
		} else {
			this.openTimeout = setTimeout(() => {
				this.showHandler(true);
				this.openTimeout = null;
			}, this.props.hoverOpenDelay);
		}
	};

	onMouseOut = () => {
		if (this.openTimeout) {
			clearTimeout(this.openTimeout);
		} else {
			this.closeTimeout = setTimeout(() => {
				this.showHandler(false);
				this.closeTimeout = null;
			}, this.props.hoverCloseDelay);
		}
	};

	onShowHandler = () => this.showHandler(true);

	onHideHandler = () => this.showHandler(false);

	onToggleHandler = () => this.showHandler(!this.state.shouldShow);

	getTargetNode = () => this._target;

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
				getTargetNode={this.getTargetNode}
				title={title}
				placement={placement}
				addArrow={addArrow}
				className={className}
				ref="popper"
			/>
		);
	}

	// NOTE: required for onClickOutside to work
	handleClickOutside() {
		const {trigger, rootClose} = this.props;

		if (rootClose && ~trigger.indexOf('click')) {
			this.showHandler(false);
		}
	}

	createEvents(trigger) {
		let events = {};

		[...new Set(trigger)].forEach(item => {
			events = {
				...events,
				...this.triggers[item]
			};
		});

		return events;
	}

	render() {
		const {alwaysShow, children, trigger, holderClassName} = this.props;
		const child = Children.only(children);
		const actionProps = alwaysShow ? {} : this.createEvents(trigger);

		return (
			<span className={holderClassName}>
				{cloneElement(child, {
					ref: (node) => {
						this._target = node;

						if (typeof child.ref === 'function') {
							child.ref(node)
						}
					},
					...actionProps
				})}
				{this._popper()}
			</span>
		)
	}
}

export default onClickOutside(Tooltip);
