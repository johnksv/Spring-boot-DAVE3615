Assignment 4: OsloMet Building Management System - Spring Boot, REST API
DAVE3615 - Software Architecture and Frameworks
By: John Kasper Svergja - s305089

Running instance on AWS: http://s305089-asgmt4.eu-central-1.elasticbeanstalk.com/

This assignment is the same as assignment 3, except these changes:
REST API:
    Base url is now /api/v1/
    Added endpoint:
        GET
            /api/v1/buildings/{buildingId}
        POST
            /api/v1/buildings/add
        GET
            /api/v1/buildings/all
Structure of the json-object is changed to match the requirements.
Please note that the new structure is a bit redundant, as I also kept the structure I used in assignment.
    One example of this is that every building now has a list of rooms, as well as the room include a buildingId.



The rest of the README is the same as for assignment 3:



Running instance on AWS (assignment 3): http://s305089-asgmt3.eu-central-1.elasticbeanstalk.com/
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
I used create-react-app so I didn't have to do all the configurtaion.
Please see frontend/package.json for which libraries I have used.
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


Design choices:
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