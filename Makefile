dev:
	docker-compose up --build

lint:
	ruff check --fix
	ruff format