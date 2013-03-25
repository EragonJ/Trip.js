build:
	make clean
	make minify
	make jade

minify:
	uglifyjs src/trip.js > src/trip.min.js

jade:
	jade index.jade

clean:
	rm -f src/trip.min.js
