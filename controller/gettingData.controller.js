const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.MONGO_URL
const MONGO_DATABASE = process.env.MONGO_DATABASE

// Sums all the values in the counts array
function addValuesInArray(array){
    if(array.length){
        let arrayIterator = 0;
        let sum = 0;
        while(arrayIterator < array.length){
            sum += array[arrayIterator];
            arrayIterator ++;
        }
        return sum;
    }
    return false

}


function fetchingData(request,response){
    var MONGO_TABLE = 'records'
    try{
        var startDate = request.body.startDate;
        var endDate = request.body.endDate;
        var minCount = parseInt(request.body.minCount);
        var maxCount = parseInt(request.body.maxCount);

        if(minCount && maxCount){
            var finalResultArray = [];
            MongoClient.connect(MONGO_URL, function(err, db) {
                var dbo = db.db(MONGO_DATABASE);
                var query = {createdAt: {$lte: new Date(endDate), $gte: new Date(startDate)}}
                dbo.collection(MONGO_TABLE).find(query).toArray(async function(err, result) {
                    if(result.length){
                        let resultItertator = 0;
                        while(resultItertator < result.length){
                            var countValue = addValuesInArray(result[resultItertator].counts)
                            if(countValue <= maxCount && countValue >= minCount){
                                finalResultArray.push({
                                    "key": result[resultItertator].key,
                                    "createdAt": result[resultItertator].createdAt,
                                    "totalCount": addValuesInArray(result[resultItertator].counts)
                                })
                            }
    
                            resultItertator ++;
                        }

                        response.status(200).json({
                            "code": 0,
                            "msg": "Success",
                            "records": finalResultArray
                        })
                    }
                })
            }
            )
        }
        else{
            response.status(400).json({
                "code": 1,
                "msg": "Failed",
                "records": [] 
            })
        }
    }
    catch(err){
        response.status(403).json({
            "code": 0,
            "msg": "Failed",
            "records": []
        })
    }
}

exports.data = {
    fetchingData
}