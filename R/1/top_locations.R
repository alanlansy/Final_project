
#load RNeo4j libraray
library(RNeo4j)


#function to connect to neo4j server
connectDB<- function(url,user,password){
    g<-startGraph(url,username=user,password=password)
    return(g)
}

#connect to db
graph=connectDB("http://54.237.227.129:34703/db/data/","neo4j","arm-deserters-services")


#locations number
limit=10

#neo4j query
query="MATCH (l:Location)<-[:OCCURRED_AT]-(:Crime)
RETURN l.address AS address, l.postcode AS postcode, count(l) AS total
ORDER BY count(l) DESC
LIMIT {lim}"

cypher(graph,query,lim=limit)
