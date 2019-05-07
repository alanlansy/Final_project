var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const neo4j = require('neo4j-driver').v1;
const driver = new neo4j.driver("bolt://graphdb.ga:7687", neo4j.auth.basic("neo4j", "password"));
const session = driver.session();
var morgan = require('morgan');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
module.exports = {
    topCrimes: function (req, res) {
        const cypher = 'MATCH (c:Crime) RETURN c.type AS crime_type, count(c) AS total ORDER BY count(c) DESC'
        session.run(cypher)
            .then(result => {

                // const count = result.records[1].get('crime_type');
                console.log('Crime Type \t Number')
                // for(i=0;i<11;i++){

                //     console.log(result.records[i].get('crime_type')+"\t"+ result.records[i].get('total'))
                // }

                res.json(result)
            })
            .catch(e => {
                // Output the error
                console.log(e);
            })

    },
    topSpots: function (req, res) {
        const cypher = 'MATCH (l:Location)<-[:OCCURRED_AT]-(:Crime) RETURN l.address AS address, l.postcode AS postcode, count(l) AS total ORDER BY count(l) DESC LIMIT 10'
        session.run(cypher)
            .then(result => {

                res.json(result)
            })
            .catch(e => {
                console.log(e);
            })


    },
    crimeNear: function(req,res){
        var address=req.body.address
        var distance = req.body.distance
        var postcode=req.body.postcode
        const query="MATCH (l:Location {address: '"+address+"', postcode: '"+postcode+"'}) WITH point(l) AS corrie MATCH (x:Location)-[:HAS_POSTCODE]->(p:PostCode), (x)<-[:OCCURRED_AT]-(c:Crime) WITH x, p, c, distance(point(x), corrie) AS distance WHERE distance < "+distance+" RETURN x.address AS address, p.code AS postcode, count(c) AS crime_total, collect(distinct(c.type)) AS crime_type, distance ORDER BY distance LIMIT 10"
        console.log(query)
        session.run(query)
        .then(result => {

            res.json(result)
        })
        .catch(e => {
            console.log(e);
        })
    },
    triangleCount: function(req,res){
        const query="CALL algo.triangleCount.stream('MATCH (p:Person)-[:PARTY_TO]->(c:Crime) RETURN id(p) AS id', 'MATCH (p1:Person)-[:KNOWS]-(p2:Person) RETURN id(p1) AS source, id(p2) AS target', {concurrency:4, graph:'cypher'}) YIELD nodeId, triangles MATCH (p:Person) WHERE ID(p) = nodeId AND  triangles > 0 RETURN p.name+' '+ p.surname as name , p.nhs_no AS id, triangles ORDER BY triangles DESC  LIMIT 10"
        console.log(query)
        session.run(query)
        .then(result => {

            res.json(result)
        })
        .catch(e => {
            console.log(e);
        })
    }
}