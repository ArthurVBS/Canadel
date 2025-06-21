GIT_HOOK=.git/hooks/pre-commit
HOOK_PATH=hooks/pre-commit

install-hooks:
	cp $(HOOK_PATH) $(GIT_HOOK)
	chmod +x $(GIT_HOOK)
