# Trikita website

To build and upload:

	cd www
	npm install -g harp
	harp compile . dist
	cp -rv dist/* ..
	git add ..
	git ci -m "....."
	git push
