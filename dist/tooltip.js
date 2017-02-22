'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _portalPopper = require('./portal-popper');

var _portalPopper2 = _interopRequireDefault(_portalPopper);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {
	return false;
};

var Tooltip = function (_Component) {
	_inherits(Tooltip, _Component);

	function Tooltip() {
		var _ref;

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		_classCallCheck(this, Tooltip);

		var _this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(props)));

		_this.state = {
			shouldShow: false
		};
		_this.triggers = {
			hover: {
				onMouseOver: function onMouseOver() {
					if (_this.closeTimeout) {
						clearTimeout(_this.closeTimeout);
					} else {
						_this.openTimeout = setTimeout(function () {
							_this.showHandler(true);
							_this.openTimeout = null;
						}, props[0].hoverOpenDelay);
					}
				},
				onMouseOut: function onMouseOut() {
					if (_this.openTimeout) {
						clearTimeout(_this.openTimeout);
					} else {
						_this.closeTimeout = setTimeout(function () {
							_this.showHandler(false);
							_this.closeTimeout = null;
						}, props[0].hoverCloseDelay);
					}
				}
			},
			click: {
				onClick: function onClick() {
					return _this.showHandler(!_this.state.shouldShow);
				}
			},
			focus: {
				onFocus: function onFocus() {
					return _this.showHandler(true);
				},
				onBlur: function onBlur() {
					return _this.showHandler(false);
				}
			}
		};
		return _this;
	}

	_createClass(Tooltip, [{
		key: 'showHandler',
		value: function showHandler(shouldShow) {
			this.setState({ shouldShow: shouldShow });

			if (shouldShow) {
				this.props.onOpen();
			} else {
				this.props.onClose();
			}
		}
	}, {
		key: '_popper',
		value: function _popper() {
			var _this2 = this;

			var _props = this.props,
			    alwaysShow = _props.alwaysShow,
			    title = _props.title,
			    placement = _props.placement,
			    addArrow = _props.addArrow,
			    className = _props.className;


			if (alwaysShow !== true && (!this.state.shouldShow || alwaysShow === false)) {
				return null;
			}

			return _react2.default.createElement(_portalPopper2.default, {
				getTargetNode: function getTargetNode() {
					return _this2.refs.target;
				},
				title: title,
				placement: placement,
				addArrow: addArrow,
				className: className,
				ref: 'popper'
			});
		}
	}, {
		key: 'handleClickOutside',
		value: function handleClickOutside() {
			var _props2 = this.props,
			    trigger = _props2.trigger,
			    rootClose = _props2.rootClose;


			if (rootClose && ~trigger.indexOf('click')) {
				this.showHandler(false);
			}
		}
	}, {
		key: 'createEvents',
		value: function createEvents(trigger) {
			var _this3 = this;

			var events = {};

			[].concat(_toConsumableArray(new Set(trigger))).forEach(function (item) {
				events = Object.assign(events, _this3.triggers[item]);
			});

			return events;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    alwaysShow = _props3.alwaysShow,
			    children = _props3.children,
			    trigger = _props3.trigger,
			    holderClassName = _props3.holderClassName;

			var actionProps = alwaysShow ? {} : this.createEvents(trigger);

			return _react2.default.createElement(
				'span',
				{ className: holderClassName },
				(0, _react.cloneElement)(_react.Children.only(children), _extends({
					ref: 'target'
				}, actionProps)),
				this._popper()
			);
		}
	}]);

	return Tooltip;
}(_react.Component);

Tooltip.propTypes = {
	className: _react.PropTypes.string,
	holderClassName: _react.PropTypes.string,
	placement: _react.PropTypes.string,
	title: _react.PropTypes.node.isRequired,
	alwaysShow: _react.PropTypes.bool,
	addArrow: _react.PropTypes.bool,
	rootClose: _react.PropTypes.bool,
	trigger: _react.PropTypes.arrayOf(_react.PropTypes.oneOf(['click', 'hover', 'focus'])),
	hoverOpenDelay: _react.PropTypes.number,
	hoverCloseDelay: _react.PropTypes.number,
	onOpen: _react.PropTypes.func,
	onClose: _react.PropTypes.func
};

Tooltip.defaultProps = {
	placement: 'top',
	trigger: ['hover'],
	hoverOpenDelay: 400,
	hoverCloseDelay: 100,
	onOpen: noop,
	onClose: noop
};

exports.default = (0, _reactOnclickoutside2.default)(Tooltip);
module.exports = exports['default'];