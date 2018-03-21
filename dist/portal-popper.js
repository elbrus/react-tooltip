'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var PortalPopper = (_temp2 = _class = function (_Component) {
	_inherits(PortalPopper, _Component);

	function PortalPopper() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, PortalPopper);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PortalPopper.__proto__ || Object.getPrototypeOf(PortalPopper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			arrowProps: initialArrowProps,
			popperProps: initialPopperProps,
			flipped: false
		}, _this._updateData = function (data) {
			if (_this.isUnmounted) {
				return;
			}

			var newState = {};

			if (data.offsets.arrow) {
				newState.arrowProps = data.offsets.arrow;
			}

			if (data.offsets.popper) {
				newState.popperProps = data.offsets.popper;
			}

			if (data.flipped != null) {
				newState.flipped = data.flipped;
			}

			_this.setState(newState);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(PortalPopper, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    getTargetNode = _props.getTargetNode,
			    title = _props.title,
			    placement = _props.placement,
			    boundary = _props.boundary;


			this.popper = new this.props.Popper(getTargetNode(), this.refs.portal._element, {
				content: title,
				placement: placement,
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
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			if (prevProps.updateCue !== this.props.updateCue) {
				this.popper.scheduleUpdate();
			}
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
			var _state$popperProps = this.state.popperProps,
			    left = _state$popperProps.left,
			    top = _state$popperProps.top,
			    position = _state$popperProps.position;

			var transform = 'translate3d(' + Math.round(left) + 'px, ' + Math.round(top) + 'px, 0)';

			return {
				position: position,
				transform: transform,
				WebkitTransform: transform
			};
		}
	}, {
		key: '_getArrowStyle',
		value: function _getArrowStyle() {
			var _state$arrowProps = this.state.arrowProps,
			    left = _state$arrowProps.left,
			    top = _state$arrowProps.top;


			return {
				left: this._getArrowProp(left),
				top: this._getArrowProp(top)
			};
		}
	}, {
		key: '_getArrowProp',
		value: function _getArrowProp(position) {
			return _lodash2.default.isNumber(position) ? Math.round(position) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    placement = _props2.placement,
			    title = _props2.title,
			    addArrow = _props2.addArrow,
			    className = _props2.className,
			    appendTo = _props2.appendTo;

			var flippedClass = this.state.flipped ? 'react-tooltip-flipped' : '';

			return _react2.default.createElement(
				_portal2.default,
				{
					ref: 'portal',
					className: 'ignore-react-onclickoutside react-tooltip react-tooltip-' + placement + ' ' + className + ' ' + flippedClass,
					style: this._getPopperStyle(),
					appendTo: appendTo
				},
				_react2.default.createElement(
					'div',
					{ className: 'react-tooltip-text' },
					title
				),
				addArrow && _react2.default.createElement('div', { ref: 'arrow', className: 'react-tooltip-arrow', style: this._getArrowStyle() })
			);
		}
	}]);

	return PortalPopper;
}(_react.Component), _class.propTypes = {
	className: _propTypes2.default.string,
	placement: _propTypes2.default.string.isRequired,
	getTargetNode: _propTypes2.default.func.isRequired,
	title: _propTypes2.default.node.isRequired,
	addArrow: _propTypes2.default.bool,
	appendTo: _propTypes2.default.any,
	Popper: _propTypes2.default.any,
	boundary: _propTypes2.default.node
}, _class.defaultProps = {
	className: '',
	addArrow: true,
	Popper: _popper2.default
}, _temp2);
exports.default = PortalPopper;
module.exports = exports['default'];