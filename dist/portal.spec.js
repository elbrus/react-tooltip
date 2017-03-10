'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _portal = require('./portal');

var _portal2 = _interopRequireDefault(_portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Portal />', function () {
	it('renders nothing', function () {
		expect((0, _enzyme.mount)(_react2.default.createElement(_portal2.default, null))).to.be.empty;
	});

	it('creates a div with a unique id', function () {
		_portal2.default.idNum = 0;
		(0, _enzyme.mount)(_react2.default.createElement(_portal2.default, null));
		(0, _enzyme.mount)(_react2.default.createElement(_portal2.default, null));
		expect(document.getElementById('portal-0')).to.exist;
		expect(document.getElementById('portal-1')).to.exist;
		document.getElementById('portal-0').remove();
		document.getElementById('portal-1').remove();
	});

	it('renders a div within the portal div with the properties passed in', function () {
		_portal2.default.idNum = 0;
		(0, _enzyme.mount)(_react2.default.createElement(_portal2.default, { className: 'foo' }));
		expect(document.querySelector('.foo')).to.exist;
		document.getElementById('portal-0').remove();
	});

	it('renders children within the rendered div', function () {
		_portal2.default.idNum = 0;
		(0, _enzyme.mount)(_react2.default.createElement(
			_portal2.default,
			{ className: 'foo' },
			_react2.default.createElement('div', { className: 'bar' })
		));
		expect(document.querySelector('.bar')).to.exist;
		document.getElementById('portal-0').remove();
	});

	it('responds to updates', function () {
		_portal2.default.idNum = 0;
		var component = (0, _enzyme.mount)(_react2.default.createElement(_portal2.default, { className: 'foo' }));
		component.setProps({ className: 'foo-new' });
		expect(document.querySelector('.foo')).not.to.exist;
		expect(document.querySelector('.foo-new')).to.exist;
		document.getElementById('portal-0').remove();
	});

	it('removes the portal div on unmount', function () {
		_portal2.default.idNum = 0;
		var component = (0, _enzyme.mount)(_react2.default.createElement(_portal2.default, null));
		component.unmount();
		expect(document.getElementById('portal-0')).not.to.exist;
	});
});