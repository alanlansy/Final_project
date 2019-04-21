
#load RNeo4j libraray
library(RNeo4j)
library(visNetwork)

#function to connect to neo4j server
connectDB<- function(url,user,password){
    g<-startGraph(url,username=user,password=password)
    return(g)
}

#connect to db
graph=connectDB("http://54.237.227.129:34703/db/data/","neo4j","arm-deserters-services")


#neo4j query
query=""

cypher(graph,query)
