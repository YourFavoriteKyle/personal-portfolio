export function addAnimation(animationObject: NodeListOf<HTMLElement>) {
	animationObject.forEach(function (element, index) {
		const animationType = element.getAttribute('animation-type');
		const animationDelay = element.getAttribute('animation-delay');

		if (onScreen(element)) {
			if (animationDelay) {
				element.style.animationDelay = animationDelay;
			}
			if (animationType) {
				if (!(animationType in element.classList)) {
					element.classList.add('animate__animated', animationType);
				}
			}
		}
	});
}

function onScreen(element: Element): boolean {
	let windowBottomEdge = window.scrollY + window.innerHeight;

	let elementTopEdge = element.getBoundingClientRect().top;

	return elementTopEdge + 150 <= windowBottomEdge ? true : false;
}
