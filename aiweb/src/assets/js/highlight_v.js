import Vue from 'vue'
import Hljs from 'highlight.js'
import 'highlight.js/styles/solarized-light.css'


export default {
	install (Vue, options) {
	  Vue.directive('highlight', function (el) {
	    let blocks = el.querySelectorAll('pre code');
	    blocks.forEach((block) => {
	      Hljs.highlightBlock(block)
	    })
	  })
	}
}



