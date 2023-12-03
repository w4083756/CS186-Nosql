// Task 3ii

db.credits.aggregate([
    // TODO: Write your query here
    {$unwind: "$crew" },
    {$match: {"crew.id": 5655, "crew.job": "Director"}},
    {$unwind: "$cast"},
    {$group: {_id: {id: "$cast.id", name: "$cast.name"}, count: {$sum: 1}}},
    {$sort: {count: -1, "_id.id": 1}},
    {$limit: 5},
    {$project: {_id: 0, count: 1, id: "$_id.id", name: "$_id.name"}}
]);