import React, { Children, cloneElement, Component, PropTypes } from 'react';
import PortalPopper from './portal-popper';

class Tooltip extends Component {
	constructor(...props) {
		super(...props);

		this.state = {
			shouldShow: false
		};
		this.triggers = {
			hover: {
				onMouseOver: () => this.setState({shouldShow: true}),
				onMouseOut: () => this.setState({shouldShow: false})
			},
			click: {
				onClick: () => this.setState({shouldShow: !this.state.shouldShow})
			},
			focus: {
				onFocus: () => this.setState({shouldShow: true}),
				onBlur: () => this.setState({shouldShow: false})
			}
		};
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

	createEvents(trigger) {
		let events = {};

		trigger.forEach(item => {
			events = Object.assign(events, this.triggers[item]);
		});

		return events;
	}

	render() {
		const {alwaysShow, children, trigger} = this.props;
		const actionProps = alwaysShow ? {} : this.createEvents(trigger);

		return (
			<span>
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
	placement: PropTypes.string,
	title: PropTypes.node.isRequired,
	alwaysShow: PropTypes.bool,
	addArrow: PropTypes.bool,
	trigger: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus']))
};

Tooltip.defaultProps = {
	placement: 'top',
	trigger: ['hover']
};

export default Tooltip;
