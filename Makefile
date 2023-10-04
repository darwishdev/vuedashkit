update:
	rm -rf node_modules && npm install

test:
	npm run test:unit
	
	
run:
	npm run dev