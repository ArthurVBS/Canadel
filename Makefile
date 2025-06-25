GIT_HOOK=.git/hooks/pre-commit
HOOK_PATH=hooks/pre-commit

install-hooks:
	cp $(HOOK_PATH) $(GIT_HOOK)
	chmod +x $(GIT_HOOK)

run-docker-compose-dotnet:
	@echo "Running Canadel Product Manager using .NET backend"
	docker compose up --build backend-dotnet frontend

run-docker-compose-java:
	@echo "Running Canadel Product Manager using Java backend"
	docker compose up --build backend-java frontend
