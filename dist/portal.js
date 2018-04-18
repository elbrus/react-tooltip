'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal = (_temp = _class = function (_Component) {
	_inherits(Portal, _Component);

	function Portal(props) {
		_classCallCheck(this, Portal);

		var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this, props));

		var appendTo = props.appendTo,
		    className = props.className,
		    style = props.style;

		var id = 'portal-' + Portal.idNum++;
		var element = appendTo.ownerDocument.getElementById(id);

		if (!element) {
			element = appendTo.ownerDocument.createElement('div');
			element.id = id;
			element.className = className;
			element.setAttribute('style', style);
		}

		_this._element = element;
		return _this;
	}

	_createClass(Portal, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.appendTo.appendChild(this._element);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.props.appendTo.removeChild(this._element);
		}
	}, {
		key: 'render',
		value: function render() {
			return _reactDom2.default.createPortal(this.props.children, this._element);
		}
	}]);

	return Portal;
}(_react.Component), _class.propTypes = {
	className: _propTypes2.default.string,
	style: _propTypes2.default.object,
	appendTo: _propTypes2.default.any
}, _class.defaultProps = {
	appendTo: document.body
}, _class.idNum = 0, _temp);
exports.default = Portal;
module.exports = exports['default'];
