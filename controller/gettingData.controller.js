const MongoClient = require('mongodb').MongoClient;
// const dbConfigDetails = dbDetails.configDetails.databaseDetails;

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


function sendStockData(request,response){
    try{
        var startDate = request.body.startDate;
        var endDate = request.body.endDate;
        var minCount = parseInt(request.body.minCount);
        var maxCount = parseInt(request.body.maxCount);

        if(minCount && maxCount){
            var finalResultArray = [];
            MongoClient.connect('mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getircase-study?retryWrites=true', function(err, db) {
                var dbo = db.db('getir-case-study');
                var query = {createdAt: {$lte: new Date(endDate), $gte: new Date(startDate)}}
                dbo.collection('records').find(query).toArray(async function(err, result) {
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
    sendStockData
}