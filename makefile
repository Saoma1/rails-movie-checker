git:
	git add .
	git commit -m "$m"
	git push origin master
# make git m=''


dbrset:
	 rails db:drop
	 rails db:create
	 rails db:migrate
	 rails db:seed
# make dbrset
