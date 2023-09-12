const isEven = (n) => n % 2 == 0;
const isMobile = () => { const i = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]; return i.some(i => navigator.userAgent.match(i)) }

//SMOTH SCROLLING
const activateSmoothScrolling = () => {
	const lenis = new Lenis();

	const raf = (time) => {
		lenis.raf(time);
		requestAnimationFrame(raf);
	};
	requestAnimationFrame(raf);
};

//ANIMATIONS
const animateNavbarAndHeaderOnLoad = () => {
	const navbarWidth = $('#navbar')[0].clientWidth;
	const companyWidth = $('#company')[0].clientWidth;
	const center = (navbarWidth - companyWidth) / 2;

	const tl = gsap.timeline();
	tl.from("#navbar", { yPercent: -200, duration: .7 });
	tl.from("#company", { x: center, duration: .4 });
	tl.from(".mainlink_top", { opacity: 0, stagger: -.04 });
	tl.from("h1", {scale: 0, opacity:0});
}

const scrollTriggerAnimation = (node, animation, adjustedEnd) => {
	//singular animation of node uses the node and its id
	//OBS if more than one animation is provided, the trigger node needs to be provided first and the first argument an array of objects containing a "node":<string> and an "animation":<object> key.
	// console.log(node);

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: !node.length ? node : node[0]?.node,
			start: 'top bottom',
			end: adjustedEnd || node[0]?.adjustedEnd || 'bottom bottom',
			scrub: true,
			markers: false
		}
	});

	if (node.length) {
		tl.addLabel("start")
		for (const element of node) {
			tl.from($(element)[0].node, element.animation, element.delay)
		}
		tl.addLabel("end");
	}
	else {
		tl.addLabel("start")
			.from(`#${node.id}`, animation)
			.addLabel("end");
	};
};

const animateSections = () => {
	//loop only needed to alter behavior
	$('section').toArray().forEach((section, i) => {
		if (isEven(i)) scrollTriggerAnimation(section, { xPercent: -100 });
		else scrollTriggerAnimation(section, { xPercent: 100 });
	});
};



//DOMCONTENT LOADED
$(() => {
	//SMOTH SCROLL (ONLY DESKTOP)
	!isMobile() && activateSmoothScrolling()
	//ANIMATIONS
	animateNavbarAndHeaderOnLoad()
	animateSections();
	//NAVBAR
	$(window).on('scroll', () => toggleNavbarOnScroll())
	$('.mobile').on('click', (e) => toggleSubMenu(e))
	//Needed for links on the menu to work
	$('.menu').on('click', (e) => (e.stopPropagation()))
})