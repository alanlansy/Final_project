Repository contains a project on crime analysis and prediction using graph mining which contains a webapp which uses neo4j graph database, python flask server, nodejs and mongodb as the backend.


**Instructions to run locally**

Dependencies
- Nodejs
- Neo4j
- Python3
- mongoDB

Steps to run 
- clone the repository
- navigate to the server directory and edit the config file with credentials of your mongo db 
- navigate to analysis directory and edit graph.js file with credentials of your neo4j server 
- open terminal at the server directory and type in the commands
 - ->npm install
 - ->node index.js
 - this will start the server at port 5000
 -you can access it now in browser localhost:5000
- for prediction module you need to start the flask server for that
 - navigate to prediction folder and open terminal there
 - install all dependencies of python packages using pip3
 - start server with python3 app.py
- this will start prediction module 




**Instructions to load the graph db dump**

follow this comment of PawanWagh at https://github.com/neo4j/neo4j/issues/12041

