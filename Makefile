.PHONY: list
list:
	@LC_ALL=C $(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

migrate:
	@python manage.py migrate

admin:
	@echo "Creating superuser"
	@echo "from django.contrib.auth import get_user_model; get_user_model().objects.create_superuser('test', '', 'test')" | python manage.py shell

run:
	@python manage.py runserver 0.0.0.0:8000

test:
	@echo "Running tests..."
	@python manage.py collectstatic --noinput
	@coverage run manage.py test
	@coverage report -m

lint:
	@echo "Running pre-commit hooks"
	@pre-commit run --all-files

mail:
	@echo "Starting mail server"
	@cp app/settings/local-example.py app/settings/local.py
	@docker run -d -p 8025:8025 -p 1025:1025 --name mailhog mailhog/mailhog
	@make run

mail-stop:
	@echo "Stopping mail server"
	@docker stop mailhog
	@docker rm mailhog
