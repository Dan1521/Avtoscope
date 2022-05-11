
document.addEventListener('DOMContentLoaded', () => {
	
	const progress = document.querySelectorAll('.item-peculity__progress');
	const burger = document.querySelector('.burger');
	const peculity = document.querySelector('.peculity');
	const menu = document.querySelector('.header-nav');
	const modals = document.querySelectorAll('.modal');
	const modalBtn = document.querySelectorAll('[data-modal]');
	const animItems = document.querySelectorAll('.animate'); 
	const accordions = document.querySelectorAll('.accordion');
	const accordionControls = document.querySelectorAll('.accordion__controls');
	const form = document.querySelector('.form-contacts')
	const telSelector = document.querySelector('.form-contacts__input-tel')
	const preloader = document.querySelector('.preloader')
	
	setTimeout(() => {
		preloader.classList.add('hide');
	}, 1000);
	burger.addEventListener('click', () => {
		if (!menu.classList.contains('active')) {
			burger.classList.add('active');
			menu.classList.add('active');
			document.body.classList.add('no-scroll')
		} else {
			burger.classList.remove('active');
			menu.classList.remove('active');
			document.body.classList.remove('no-scroll')
		}
	});
	progress.forEach((element) => {
		let circle = element.querySelector('.item-peculity__progress-circle');
		let persent = element.querySelector('.item-peculity__progress-persent').innerHTML;

		let radius = circle.r.baseVal.value;
		let circumference = 2 * Math.PI * radius;
		let offset = circumference - persent / 100 * circumference;


		circle.style.strokeDashoffset = circumference;
		circle.style.strokeDasharray = `${circumference} ${circumference}`;
	}); 

	const secutitySwiper = new Swiper('.security__swiper', {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 2500,
		},
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 16,
			}
		}
	});

	modalBtn.forEach(btn => {
		btn.addEventListener('click', (event) => {
		let self = event.currentTarget;
		let selfCateg = self.dataset.modal;

			modals.forEach(modal => {
				if (selfCateg === modal.id) {
					if (!modal.classList.contains('modal-open')) {
						modal.classList.add('modal-open')
						document.body.classList.add('no-scroll')
					}
				}
			});
		})
	});
	modals.forEach(modal => {
		modal.addEventListener('click', (event) => {
			let self = event.target;

			if (self.classList.contains('modal-open') || self.classList.contains('modal__close')) {
				modal.classList.remove('modal-open');
				if (!menu.classList.contains('active')) {
					document.body.classList.remove('no-scroll');
				}
			}
					
		});
	});
	window.addEventListener('scroll',()=> scrollAnim())
	scrollAnim()

	accordionControls.forEach((control) => {
		control.addEventListener('click', (event)=> {
			let self = event.currentTarget;
			let accordion = self.closest('.accordion');
			let accordionContent = self.nextElementSibling;
			let accordionContentHeight = accordionContent.scrollHeight;

			if (!accordion.classList.contains('accordion--active')) {
				accordions.forEach((element) => {
					element.classList.remove('accordion--active');
					element.querySelector('.accordion__content').style.maxHeight = 0
				})
				accordion.classList.add('accordion--active');
				accordionContent.style.maxHeight = accordionContentHeight + 'px'
			} else {
				accordion.classList.remove('accordion--active');
				accordionContent.style.maxHeight = 0
			}

		})
	})


	if (telSelector) {
		let masked = new Inputmask("+7 (999) 999-99-99");
		masked.mask(telSelector);
	}
	
	
	if (form) {
		const validation = new JustValidate('.form-contacts');
		validation
			.addField('.form-contacts__input-name', [
				{
					rule: 'required',
					value: true,
				},
				{
					rule: 'minLength',
					value: 3,
				},
				{
					rule: 'maxLength',
					value: 30,
				},
			])
			.addField('.form-contacts__input-email', [
				{
					rule: 'required',
				},
				{
					rule: 'email',
				},
			])
			.addField('.form-contacts__input-tel', [
				{
					rule: 'required',
				},
				{
					rule: 'function',
					validator: function() {
						const phone = telSelector.inputmask.unmaskedvalue()
						return phone.length === 10
					},
				},
			])
			.addField('.form-contacts__input-text', [
				{
					rule: 'required',
				},
				{
					rule: 'minLength',
					value: 3,
				},
				{
					rule: 'maxLength',
					value: 100,
				},
			])
			.addField('.form-contacts__argeem-input', [
				{
					rule: 'required',
				},
			]).onSuccess((event) => {
				console.log('sent')
			})
	}

	function scrollAnim() {
		if (animItems.length>0) {
			animItems.forEach((element) => {
				let animItem = element
				let animItemHeight = animItem.offsetHeight;
				let animItemOffest = offset(animItem);
				let animStart = 4;
				
				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				
				if ( animItemPoint > window.innerHeight ) {
					animItemPoint = window.innerHeight - window.innerHeight  / animStart;
				}

				if (pageYOffset > animItemOffest - animItemPoint) {
					animItem.classList.add('animate-active');
					setTimeout(() => {
						progresBar()
					}, 300);
				}
			});
		}
	}
	function offset(item) {
		let rect = item.getBoundingClientRect(),
			top = window.pageYOffset + rect.top
		return top
	}
	function progresBar() {
		progress.forEach((element) => {
			let circle = element.querySelector('.item-peculity__progress-circle');
			let persent = element.querySelector('.item-peculity__progress-persent').innerHTML;

			let radius = circle.r.baseVal.value;
			let circumference = 2 * Math.PI * radius;
			let offset = circumference - persent / 100 * circumference;


			circle.style.strokeDashoffset = offset;
			circle.style.strokeDasharray = `${circumference} ${circumference}`;
		}); 
	}

	
	
});



