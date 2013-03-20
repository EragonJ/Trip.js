build:
	make clean
	make minify

minify:
	uglifyjs src/trip.js > src/trip.min.js

clean:
	rm -f src/trip.min.js
