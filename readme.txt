Assignment 3: OsloMet Building Management System - Spring Boot
DAVE3615 - Software Architecture and Frameworks
By: John Kasper Svergja - s305089

Running instance on AWS: http://s305089-asgmt3.eu-central-1.elasticbeanstalk.com/

To launch on local machine:
Unpack the zip to a destination of your choice.
Decide if you want to use HSQLDB in-memory or MySQL.
	HSQLDB:
		Nothing is needed, I've already set it up. :) 
	MySQL:
		Open application.properties (located at src/main/resources)
		Update the datasource-values (either by uncommenting or changing)
		If you don't have a running mysql-server, I recommend booting up a docker container (see application.properties for command).
	
Frontend development:
Froentend is coded in react (https://reactjs.org/).
Requirements: Yarn (https://yarnpkg.com/en/)
If you want to tweak the fronend, you will have to run up a own frontend development server (runs on localhost:3000).
To get started:
	cd frontend
	yarn install
	yarn start
To build it with spring boot: 
	"yarn build", then copy over html, javascript and css file to their respective folders in /src/main/resources.
Index.html: /src/main/resources/templates
js-files: /src/main/resources/static/static/js
css-files: /src/main/resources/static/static/css


REST API endpoints:
I added a endpoint to populate the database with one building:
	GET: /populate
The following endpoints should be self explanatory.
Building:
	GET:
		/buldings 
		/buildings/{id}
	POST:
		/buldings 
	PATCH:
		/buildings/{id}
	DELETE:
		/buildings/{id}	
Room:
	GET:
		/rooms 
		/rooms/{id}
		/buildings/{buildingID}/rooms
	POST:
		/buildings/{buildingID}/rooms
	PATCH:
		/rooms/{roomID}
	DELETE:
		/buildings/{buildingID}/rooms/{id}	


Design choiches:
Service layer:
	I have not implemented a service layer in this assigment.
	The way I see it, use of a service layer would be an anti-pattern in this assigment, as it just wraps around the dao.
CrudRepository is used for easy database access.


Questions regarding the assignment:
Why isn't Category just a field in Room?
Category has one field in addition to it's ID, and it is also one-to-one relationship.
With other words it could just be a extra field in Room (private String Category). 


AWS:
	I used the following link to get the instance up and running on aws:
	https://aws.amazon.com/blogs/devops/deploying-a-spring-boot-application-on-aws-using-aws-elastic-beanstalk/
	The only change I had to do was to the SPRING_DATASOURCE_URL variable, where I appended "?createDatabaseIfNotExist=true"