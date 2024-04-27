update:
	rm -rf node_modules && npm install

test:
	npm run test:unit
	
	
run:
	npm run dev


clean:
	rm -rf ./src/**/**/*.d.ts
build-types:
	npx vue-tsc --declaration --emitDeclarationOnly


build:
	npm run build &&  npx vue-tsc --declaration --emitDeclarationOnly --outDir dist -p tsconfig.app.json --target esnext  