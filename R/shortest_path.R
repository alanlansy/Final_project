
#load RNeo4j libraray
library(RNeo4j)
library(igraph)

#function to connect to neo4j server
connectDB<- function(url,user,password){
    g<-startGraph(url,username=user,password=password)
    return(g)
}

#connect to db
graph=connectDB("http://54.237.227.129:34703/db/data/","neo4j","arm-deserters-services")


#neo4j query
query="MATCH (c:Crime {last_outcome: 'Under investigation', type: 'Drugs'})-[:INVESTIGATED_BY]->(:Officer {badge_no: '26-5234182'}),
(c)<-[:PARTY_TO]-(p:Person)
WITH COLLECT(p) AS persons
UNWIND persons AS p1
UNWIND persons AS p2
WITH * WHERE id(p1) < id(p2)
MATCH path = allshortestpaths((p1)-[:KNOWS|KNOWS_LW|KNOWS_SN|FAMILY_REL|KNOWS_PHONE*..3]-(p2))
RETURN path"


edgelist=cypherToList(graph,query)
head(edgelist)



