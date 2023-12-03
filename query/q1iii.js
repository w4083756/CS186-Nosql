// Task 1iii

db.ratings.aggregate([
    // TODO: Write your query here
    {$group: {_id: "$rating", count: {$sum: 1}}},
    {$project: {rating: "$_id", _id: 0, count: 1 }},
    {$sort: {rating: -1}}
]);