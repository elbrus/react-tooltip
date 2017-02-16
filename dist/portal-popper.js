'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _popper = require('popper.js');

var _popper2 = _interopRequireDefault(_popper);

var _portal = require('./portal');

var _portal2 = _interopRequireDefault(_portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialArrowProps = {
	left: 0,
	top: 0
};

var initialPopperProps = {
	left: 0,
	position: 'absolute',
	top: 0
};

var PortalPopper = function (_Component) {
	_inherits(PortalPopper, _Component);

	function PortalPopper() {
		var _ref;

		_classCallCheck(this, PortalPopper);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = PortalPopper.__proto__ || Object.getPrototypeOf(PortalPopper)).call.apply(_ref, [this].concat(props)));

		_this.state = {
			arrowProps: initialArrowProps,
			popperProps: initialPopperProps
		};
		return _this;
	}

	_createClass(PortalPopper, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

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

			this.popper.onUpdate = function (data) {
				if (_this2.isUnmounted) {
					return;
				}

				var newState = {};
				if (data.offsets.arrow) {
					newState.arrowProps = data.offsets.arrow;
				}
				if (data.offsets.popper) {
					newState.popperProps = data.offsets.popper;
				}
				_this2.setState(newState);
			};

			this.popper.update();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.isUnmounted = true;
			this.popper && this.popper.destroy();
		}
	}, {
		key: '_getPopperStyle',
		value: function _getPopperStyle() {
			var left = Math.round(this.state.popperProps.left);
			var top = Math.round(this.state.popperProps.top);
			var transform = 'translate3d(' + left + 'px, ' + top + 'px, 0)';

			return {
				position: this.state.popperProps.position,
				transform: transform,
				WebkitTransform: transform
			};
		}
	}, {
		key: '_getArrowStyle',
		value: function _getArrowStyle() {
			var left = _lodash2.default.isNumber(this.state.arrowProps.left) ? Math.round(this.state.arrowProps.left) : null;
			var top = _lodash2.default.isNumber(this.state.arrowProps.top) ? Math.round(this.state.arrowProps.top) : null;

			return {
				left: left,
				top: top
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    placement = _props.placement,
			    title = _props.title,
			    addArrow = _props.addArrow,
			    className = _props.className;


			return _react2.default.createElement(
				_portal2.default,
				{ ref: 'popper', className: 'react-tooltip react-tooltip-' + placement + ' ' + className, style: this._getPopperStyle() },
				title,
				addArrow && _react2.default.createElement('div', { ref: 'arrow', className: 'react-tooltip-arrow', style: this._getArrowStyle() })
			);
		}
	}]);

	return PortalPopper;
}(_react.Component);

PortalPopper.propTypes = {
	className: _react.PropTypes.string,
	placement: _react.PropTypes.string.isRequired,
	getTargetNode: _react.PropTypes.func.isRequired,
	title: _react.PropTypes.node.isRequired,
	addArrow: _react.PropTypes.bool
};

PortalPopper.defaultProps = {
	Popper: _popper2.default,
	addArrow: true,
	className: ''
};

exports.default = PortalPopper;
module.exports = exports['default'];