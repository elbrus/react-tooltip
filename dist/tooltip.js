'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _portalPopper = require('./portal-popper');

var _portalPopper2 = _interopRequireDefault(_portalPopper);

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

		var _temp, _this, _ret;

		_classCallCheck(this, Tooltip);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			shouldShow: false
		}, _this.onMouseOver = function () {
			if (_this.closeTimeout) {
				clearTimeout(_this.closeTimeout);
			} else {
				_this.openTimeout = setTimeout(function () {
					_this.showHandler(true);
					_this.openTimeout = null;
				}, _this.props.hoverOpenDelay);
			}
		}, _this.onMouseOut = function () {
			if (_this.openTimeout) {
				clearTimeout(_this.openTimeout);
			} else {
				_this.closeTimeout = setTimeout(function () {
					_this.showHandler(false);
					_this.closeTimeout = null;
				}, _this.props.hoverCloseDelay);
			}
		}, _this.onShowHandler = function () {
			return _this.showHandler(true);
		}, _this.onHideHandler = function () {
			return _this.showHandler(false);
		}, _this.onToggleHandler = function () {
			return _this.showHandler(!_this.state.shouldShow);
		}, _this.getTargetNode = function () {
			return _this._target;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Tooltip, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
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
	}, {
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
				getTargetNode: this.getTargetNode,
				title: title,
				placement: placement,
				addArrow: addArrow,
				className: className,
				ref: 'popper'
			});
		}
	}, {
		key: 'createEvents',
		value: function createEvents(trigger) {
			var _this2 = this;

			var events = {};

			[].concat(_toConsumableArray(new Set(trigger))).forEach(function (item) {
				events = Object.assign(events, _this2.triggers[item]);
			});

			return events;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props2 = this.props,
			    alwaysShow = _props2.alwaysShow,
			    children = _props2.children,
			    trigger = _props2.trigger,
			    holderClassName = _props2.holderClassName;

			var child = _react.Children.only(children);
			var actionProps = alwaysShow ? {} : this.createEvents(trigger);

			return _react2.default.createElement(
				'span',
				{ className: holderClassName },
				(0, _react.cloneElement)(child, _extends({
					ref: function ref(node) {
						_this3._target = node;

						if (typeof child.ref === 'function') {
							child.ref(node);
						}
					}
				}, actionProps)),
				this._popper()
			);
		}
	}]);

	return Tooltip;
}(_react.Component);

Tooltip.propTypes = {
	className: _propTypes2.default.string,
	holderClassName: _propTypes2.default.string,
	placement: _propTypes2.default.string,
	title: _propTypes2.default.node.isRequired,
	alwaysShow: _propTypes2.default.bool,
	addArrow: _propTypes2.default.bool,
	trigger: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['click', 'hover', 'focus', 'click-close'])),
	hoverOpenDelay: _propTypes2.default.number,
	hoverCloseDelay: _propTypes2.default.number,
	onOpen: _propTypes2.default.func,
	onClose: _propTypes2.default.func
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