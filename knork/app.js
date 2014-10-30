function each() {
	var a = Array.prototype.slice.call(arguments)
	if (typeof a[0] === 'string') a.unshift(document);
	Array.prototype.some.call(a[0].querySelectorAll(a[1]), a[2]);
}
function prepareTabs(tabs) {
	each(tabs, 'li > a', function(tab, i) {
		tab.addEventListener('click', function(e) {
			e.preventDefault();
			each(tabs, 'li > a', function(a) { a.className = ''; });
			each(tabs, '.tabs-content .code', function(content) { content.className = 'code hidden'; });
			tab.className = 'active';
			tabs.querySelectorAll('.tabs-content .code')[i].className = 'code';
		});
	});
}

window.onload = function() {
	each('.tabs', prepareTabs);
	document.addEventListener('scroll', function(e) {
		e.preventDefault();
		each('nav a', function(h) { h.className = '';});
		each('.content section', function(h, i) {
			var top = document.body.scrollTop || document.documentElement.scrollTop;
			if (top < h.offsetTop + h.offsetHeight) {
				document.querySelectorAll('nav a' )[i].className = 'active';
				return true;
			}
		});
	});
};
