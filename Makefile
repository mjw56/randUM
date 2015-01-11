WELCOME=\033[37m---------- rxjs lab ----------\033[39m

all: hello webpack

hello:
	@echo "\n${WELCOME}\n"

webpack:
	@6to5-node server.js
