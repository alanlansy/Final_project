
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
query="MATCH (l:Location {address: '1 Coronation Street', postcode: 'M5 3RW'})
WITH point(l) AS corrie
MATCH (x:Location)-[:HAS_POSTCODE]->(p:PostCode),
(x)<-[:OCCURRED_AT]-(c:Crime)
WITH x, p, c, distance(point(x), corrie) AS distance
WHERE distance < 500
RETURN x.address AS address, p.code AS postcode, count(c) AS crime_total, collect(distinct(c.type)) AS crime_type, distance
ORDER BY distance
LIMIT 10"

cypher(graph,query)
