import chai from 'chai';
import Event from '../../../src/libs/event';

const {expect} = chai;

/** @test {Event} */
describe('Event', () => {

    /** @test {Event#constrcutor} */
    it('constrcutor', () => {
        expect(Event).is.instanceof(Function);
        const event = new Event();
        expect(event.on).is.instanceof(Function);
        expect(event.off).is.instanceof(Function);
        expect(event.emit).is.instanceof(Function);
    });
});
