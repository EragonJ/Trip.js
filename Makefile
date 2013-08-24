build:
	make clean
	make minify
	make scss
	make jade

minify:
	uglifyjs src/trip.js > src/trip.min.js

scss:
	sass --compass src/trip.scss:src/trip.css
	sass --compass src/trip.scss:src/trip.min.css --style compressed

jade:
	jade views/*.jade --out ./
	# remove unnecessary layout
	rm layout.html

clean:
	rm -f src/trip.min.js
