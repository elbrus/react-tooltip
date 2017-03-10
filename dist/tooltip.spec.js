'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _portalPopper = require('./portal-popper');

var _portalPopper2 = _interopRequireDefault(_portalPopper);

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {
	placement: 'top',
	title: 'Do foo',
	alwaysShow: false,
	trigger: ['hover']
};

var createComponent = function createComponent(props) {
	return _react2.default.createElement(
		_tooltip2.default,
		_lodash2.default.extend({}, defaultProps, props),
		_react2.default.createElement('div', { className: 'target' })
	);
};

describe('<Tooltip />', function () {
	it('does not render popper if alwaysShow is false', function () {
		var component = (0, _enzyme.shallow)(createComponent());
		expect(component.find(_portalPopper2.default)).not.to.exist;
	});

	it('renders popper if alwaysShow is true', function () {
		var component = (0, _enzyme.shallow)(createComponent({ alwaysShow: true }));
		expect(component.find(_portalPopper2.default)).to.exist;
	});

	describe('when visible is not explicitly specified', function () {
		var component = void 0;
		beforeEach(function () {
			component = (0, _enzyme.shallow)(createComponent({ alwaysShow: null }));
		});

		it('renders popper on mouse over', function () {
			component.find('.target').simulate('mouseOver');
			expect(component.find(_portalPopper2.default)).to.exist;
		});

		it('does not render popper on mouse out', function () {
			component.find('.target').simulate('mouseOver');
			component.find('.target').simulate('mouseOut');
			expect(component.find(_portalPopper2.default)).not.to.exist;
		});
	});
});