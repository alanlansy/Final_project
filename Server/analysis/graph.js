var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const neo4j = require('neo4j-driver').v1;
const driver = new neo4j.driver("bolt://graphdb.ga:7687", neo4j.auth.basic("neo4j", "password"));
const session = driver.session();
var morgan = require('morgan');
app.use(morgan('dev'));

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

                console.log('Crime Type \t Number')

                res.json(result)
            })
            .catch(e => {
                console.log(e);
            })


    }
}