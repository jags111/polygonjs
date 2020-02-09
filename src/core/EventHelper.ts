import {Vector2} from 'three/src/math/Vector2';
const THREE = {Vector2};

export class EventHelper {
	constructor(private element: HTMLElement) {}

	set_element(element: HTMLElement) {
		this.element = element;
	}

	static element_position(event: MouseEvent | TouchEvent, element: HTMLElement, position: THREE.Vector2) {
		const dim = element.getBoundingClientRect();

		if ((event as TouchEvent).changedTouches) {
			event = event as TouchEvent;
			const touch = event.changedTouches[0];
			position.x = touch.pageX - dim.x;
			position.y = touch.pageY - dim.y;
		} else {
			event = event as MouseEvent;
			position.x = event.pageX - dim.x;
			position.y = event.pageY - dim.y;
		}
	}
	static element_position_old(event: MouseEvent, element: HTMLElement) {
		const dim = element.getBoundingClientRect();
		const x = event.pageX - dim.x;
		const y = event.pageY - dim.y;
		// console.log(event, x, y)
		return new THREE.Vector2(x, y);
	}

	static normalized_position(event: MouseEvent, element: HTMLElement, position: THREE.Vector2) {
		this.element_position(event, element, position);

		const dim = element.getBoundingClientRect();

		// const mouse = new THREE.Vector2();
		position.x = ((position.x - window.scrollX) / dim.width) * 2 - 1;
		position.y = -(((position.y - window.scrollY) / dim.height) * 2 - 1);
		// return mouse;
	}
	static normalized_position_0_1(event: MouseEvent, element: HTMLElement, position: THREE.Vector2) {
		this.element_position(event, element, position);

		const dim = element.getBoundingClientRect();

		// const mouse = new THREE.Vector2();
		position.x = (position.x - window.scrollX) / dim.width;
		position.y = (position.y - window.scrollY) / dim.height;
		// return mouse;
	}

	element_position(event: MouseEvent, position: THREE.Vector2) {
		EventHelper.element_position(event, this.element, position);
	}
	element_position_old(event: MouseEvent) {
		return EventHelper.element_position_old(event, this.element);
	}

	normalized_position(event: MouseEvent, position: THREE.Vector2) {
		EventHelper.normalized_position(event, this.element, position);
	}
}
