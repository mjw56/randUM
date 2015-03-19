WELCOME=\033[37m---------- rxjs lab ----------\033[39m

all: hello webpack

hello:
	@echo "\n${WELCOME}\n"

webpack:
	@babel-node server.js
