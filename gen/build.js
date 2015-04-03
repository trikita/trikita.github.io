#!/usr/bin/env node

var fs = require('fs');
var less = require('less');
var marked = require('marked');

var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
	var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
	return '<h' + level + ' id="markdown-header-'+escapedText+'">' +
		text + '</h' + level + '>';
};

var template = fs.readFileSync(process.argv[3], 'utf8');
var content = fs.readFileSync(process.argv[2], 'utf8');
var css = fs.readFileSync('styles.less', 'utf8');
less.render(css, function(e, output) {
	if (e) {
		console.log(e);
		return;
	}
	fs.writeFileSync('styles.css', output.css);
});

var html = template.replace('$CONTENT', marked(content, {
	renderer: renderer,
	gfm: true,
	highlight: function (code) {
		return require('highlight.js').highlightAuto(code).value;
	}
}));
fs.writeFileSync('index.html', html);

