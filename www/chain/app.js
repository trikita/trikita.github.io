function each() {
	var a = Array.prototype.slice.call(arguments)
	if (typeof a[0] === 'string') a.unshift(document);
	Array.prototype.some.call(a[0].querySelectorAll(a[1]), a[2]);
}

window.onload = function() {

	var links = document.querySelectorAll('ul > li > a');
	for (var i = 0; i < links.length; i++) {
		links[i].href = links[i].href.replace(/markdown-header-/, '');
	}

	document.addEventListener('scroll', function(e) {
		e.preventDefault();
		var links = []
		each('a', function(a) {
			a.className = '';
			links.push(a);
		});

		for (var i = links.length - 1; i >= 0; i--) {
			var a = links[i];
			var top = document.body.scrollTop || document.documentElement.scrollTop;
			var found = false;
			each('h1, h2, h3', function(h) {
				if (a.href.endsWith('#' + h.id)) {
					if (top > h.offsetTop - h.offsetHeight) {
						a.className = 'active';
						found = true;
						return true;
					}
				}
			});
			if (found) {
				break;
			}
		}
	});

	var disqus = document.createElement('div');
	var footer = document.querySelector('p:last-of-type');
	disqus.id = 'disqus_thread';
	footer.parentNode.insertBefore(disqus, footer);

	// Disqus
	var disqus_shortname = 'trikita-site';
	(function() {
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();

	// Google Analytics
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-33644825-2', 'auto');
	ga('send', 'pageview');
};

