BUILD_DIR=build/

default: run

install_dependencies:
	yarn install

run: install_dependencies
	yarn start

build: install_dependencies
	yarn build

clean:
	rm -rf $(BUILD_DIR)
