
#load RNeo4j libraray
library(RNeo4j)


#function to connect to neo4j server
connectDB<- function(url,user,password){
    g<-startGraph(url,username=user,password=password)
    return(g)
}

#connect to db
graph=connectDB("http://54.237.227.129:34703/db/data/","neo4j","arm-deserters-services")


#neo4j query
query="CALL algo.triangleCount.stream('Person', 'KNOWS', {concurrency:4})
YIELD nodeId, triangles
MATCH (p:Person)
WHERE ID(p) = nodeId AND
triangles > 0
RETURN p.name AS name, p.surname AS surname, p.nhs_no AS id, triangles
ORDER BY triangles DESC
LIMIT 10"

cypher(graph,query)
