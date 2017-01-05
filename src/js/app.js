import setPathCookie from './utils/setPathCookie.js'
import { selectAll, addClass } from './utils/dom'
import removeMobileHover from './utils/removeMobileHover.js'
import wireSocialButtons from './utils/wireSocialButtons.js'

removeMobileHover()
setPathCookie()

// Add class to html if JS is loaded
document.querySelector('html').classList.add('js-is-loaded')

// Wire header social if present
if (document.querySelectorAll('.g-header__share').length) {
	wireSocialButtons({
		facebook: '.g-header__share-button--fb',
		twitter: '.g-header__share-button--tw',
	})
}

const expanders = selectAll('.journalist__expand')
expanders.map( el => {
	el.addEventListener('click', e => {
		addClass(el, 'journalist__expand--expanded')
	})
})