// Task 2ii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {$addFields: {word: {$split: ["$tagline", " "]}}},
    {$unwind: "$word"},
    {$addFields: {word: {$toLower: "$word"}}},
    {$addFields: {word: {$trim: {input: "$word", chars: "?.,!"}}}},
    {$addFields: {wordlen: {$strLenCP: "$word"}}},
    {$match: {wordlen: {$gt: 3}}},
    {$group: {_id: "$word", count: {$sum: 1}}},
    {$project: {_id: 1, count: 1}},
    {$sort: {count: -1}},
    {$limit: 20}
]);