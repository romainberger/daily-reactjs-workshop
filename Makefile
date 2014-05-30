HR=\033[37m--------------------- Dailymotion ReactJs 👍 -----------------------------\033[39m

all: hello server react

hello:
	@echo "\n${HR}\n"

server:
	@python -m SimpleHTTPServer

react:
	@./node_modules/react-tools/bin/jsx --watch js/src js/build
