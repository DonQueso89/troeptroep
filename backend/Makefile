deploy: deploy_env export_deps
	deta deploy
deploy_env:
	deta update --env .env
export_deps:
	poetry export --without-hashes > requirements.txt
