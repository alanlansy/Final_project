
//triangle count visualtzation

MATCH path = (p1:Person {nhs_no: '838-45-9343', surname: 'Ford'})-[:KNOWS]-(p2)-[:KNOWS]-(p3)-[:KNOWS]-(p1)
RETURN path


//subgraph and triangle count 

MATCH (p1:Person {nhs_no: '337-28-4424', surname: 'Williamson'})-[k1:KNOWS]-(p2)-[k2:KNOWS]-(p3)-[k3:KNOWS]-(p1)
WITH *
MATCH (person)-[pt:PARTY_TO]->(crime) WHERE person IN[p1, p2, p3]
RETURN * 
