'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _portal = require('./portal');

var _portal2 = _interopRequireDefault(_portal);

var _portalPopper = require('./portal-popper');

var _portalPopper2 = _interopRequireDefault(_portalPopper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getProps = function getProps(props) {
	return _lodash2.default.extend({
		placement: 'top',
		title: _react2.default.createElement(
			'span',
			null,
			'tooltip title'
		),
		getTargetNode: _sinon2.default.stub().returns('target node'),
		addArrow: true
	}, props);
};

var popperInstanceStub = function popperInstanceStub() {
	return {
		onUpdate: _sinon2.default.spy(),
		update: _sinon2.default.spy(),
		destroy: _sinon2.default.spy()
	};
};

var popperStub = function popperStub(popperInstance) {
	return _sinon2.default.stub().returns(popperInstance);
};

describe('<PortalPopper />', function () {
	it('renders a <Portal /> with a placement class', function () {
		var component = (0, _enzyme.shallow)(_react2.default.createElement(_portalPopper2.default, getProps()));
		expect(component.find(_portal2.default)).to.have.className('react-tooltip-top');
	});

	it('renders a <Portal /> with default styles', function () {
		var component = (0, _enzyme.shallow)(_react2.default.createElement(_portalPopper2.default, getProps()));
		expect(component.find(_portal2.default).prop('style').position).to.equal('absolute');
		expect(component.find(_portal2.default).prop('style').transform).to.equal('translate3d(0px, 0px, 0)');
		expect(component.find(_portal2.default).prop('style').WebkitTransform).to.equal('translate3d(0px, 0px, 0)');
	});

	it('renders the title specified', function () {
		var component = (0, _enzyme.shallow)(_react2.default.createElement(_portalPopper2.default, getProps()));
		expect(component.find('span')).to.have.text('tooltip title');
	});

	it('renders the tooltip arrow with default styles', function () {
		var component = (0, _enzyme.shallow)(_react2.default.createElement(_portalPopper2.default, getProps()));
		expect(component.find('.react-tooltip-arrow').prop('style').left).to.equal(0);
		expect(component.find('.react-tooltip-arrow').prop('style').top).to.equal(0);
	});

	it('creates Popper instance with the right props', function () {
		var Popper = popperStub(popperInstanceStub());
		var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: Popper })));
		expect(Popper).to.have.been.called;
		expect(Popper.getCall(0).args[0]).to.equal('target node');
		expect(Object.keys(Popper.getCall(0).args[2])).to.eql(['content', 'placement', 'modifiers']);
	});

	it('calls update() on the Popper instance', function () {
		var popperInstance = popperInstanceStub();
		(0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
		expect(popperInstance.update).to.have.been.called;
	});

	it('destroys the Popper instance on unmount', function () {
		var popperInstance = popperInstanceStub();
		var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
		component.unmount();
		expect(popperInstance.destroy).to.have.been.called;
	});

	// somehow yield doesn't work
	xdescribe('Popper#onUpate', function () {
		it('updates the arrow props if specified', function () {
			var popperInstance = popperInstanceStub();
			var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
			popperInstance.onUpdate.yield({ offsets: { arrow: { left: 5, top: 10 } } });
			expect(component.ref('arrow').prop('style').left).to.equal(5);
			expect(component.ref('arrow').prop('style').top).to.equal(10);
		});

		it('does not update the arrow props if not specified', function () {
			var popperInstance = popperInstanceStub();
			var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
			popperInstance.onUpdate.yield({ offsets: {} });
			expect(component.ref('arrow').prop('style').left).to.equal(0);
			expect(component.ref('arrow').prop('style').top).to.equal(0);
		});

		it('only updates the arrow props that are specified', function () {
			var popperInstance = popperInstanceStub();
			var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
			popperInstance.onUpdate.yield({ offsets: { arrow: { top: 20 } } });
			expect(component.ref('arrow').prop('style').left).to.equal(null);
			expect(component.ref('arrow').prop('style').top).to.equal(20);
		});

		it('rounds the arrow props', function () {
			var popperInstance = popperInstanceStub();
			var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
			popperInstance.onUpdate.yield({ offsets: { arrow: { left: 7.2, top: 20.8 } } });
			expect(component.ref('arrow').prop('style').left).to.equal(7);
			expect(component.ref('arrow').prop('style').top).to.equal(21);
		});

		it('updates the popper props if specified', function () {
			var popperInstance = popperInstanceStub();
			var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
			popperInstance.onUpdate.yield({ offsets: { popper: { position: 'relative', left: 2, top: 4 } } });
			expect(component.find(_portal2.default).prop('style').position).to.equal('relative');
			expect(component.find(_portal2.default).prop('style').transform).to.equal('translate3d(2px, 4px, 0)');
			expect(component.find(_portal2.default).prop('style').WebkitTransform).to.equal('translate3d(2px, 4px, 0)');
		});

		it('does not update the popper props if not specified', function () {
			var popperInstance = popperInstanceStub();
			var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
			popperInstance.onUpdate.yield({ offsets: {} });
			expect(component.find(_portal2.default).prop('style').position).to.equal('absolute');
			expect(component.find(_portal2.default).prop('style').transform).to.equal('translate3d(0px, 0px, 0)');
			expect(component.find(_portal2.default).prop('style').WebkitTransform).to.equal('translate3d(0px, 0px, 0)');
		});

		it('rounds the popper props', function () {
			var popperInstance = popperInstanceStub();
			var component = (0, _enzyme.mount)(_react2.default.createElement(_portalPopper2.default, getProps({ Popper: popperStub(popperInstance) })));
			popperInstance.onUpdate.yield({ offsets: { popper: { left: 15.2, top: 2.8 } } });
			expect(component.find(_portal2.default).prop('style').transform).to.equal('translate3d(15px, 3px, 0)');
			expect(component.find(_portal2.default).prop('style').WebkitTransform).to.equal('translate3d(15px, 3px, 0)');
		});
	});
});