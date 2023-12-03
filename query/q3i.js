// Task 3i

db.credits.aggregate([
    // TODO: Write your query here
    {$unwind: "$cast"},
    {$match: {"cast.id": 7624}},
    {$lookup:
     {
        from: "movies_metadata",
        localField: "movieId",
        foreignField: "movieId",
        as: "a"
     }},
    {$unwind: "$a"},
    {$project: {_id: 0, title: "$a.title", release_date: "$a.release_date", character: "$cast.character"}},
    {$sort: {release_date: -1}}
]);