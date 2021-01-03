var cassandra = require('cassandra-driver');

class CassandraDB
{
   constructor(){
        this.client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'storetechland'});
    }
        
    connection(str){
        this.client.connect(function(err, result){
            console.log('Cassandra connected:' + str);
        })
    }
}

module.exports = CassandraDB;