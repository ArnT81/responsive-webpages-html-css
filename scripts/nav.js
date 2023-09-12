let lastScrollTop = 0;

const getNavbarHeight = () => getComputedStyle($(':root')[0]).getPropertyValue('--nav-height');

const adjustForBoxShadow = () => `${parseInt(getNavbarHeight().split('px')[0]) + 14}px`

const toggleNavbarOnScroll = () => {
	let currentScrollTop = $(this).scrollTop();
	if (currentScrollTop > lastScrollTop) {
		$('nav').css({ top: `-${adjustForBoxShadow()}`, transition: '.1s' });
		$('.menu').css({ display: 'none' });
	} else {
		$('nav').css({ top: '16px' });
	}
	lastScrollTop = currentScrollTop;
}

const toggleSubMenu = (e) => {
	e.preventDefault();
	$('.menu').slideToggle(50);
}