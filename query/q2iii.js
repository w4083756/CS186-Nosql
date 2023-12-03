// Task 2iii

db.movies_metadata.aggregate([
    // TODO: Write your query here
    {$addFields: {budget:
    {$cond: {if: { $or: [{$eq: [ "$budget", false ]},
                         {$eq: [ "$budget", null ]},
                         {$eq: [ "$budget", ""]},
                         {$eq: [ "$budget", undefined ]}]}, then: "unknown",
                         else: {$round: [{$cond: {if: {$isNumber: "$budget"}, then: "$budget",
                         else: {$toInt: {$trim: {input: "$budget", chars: " USD$"}}}
                         }}, -7]}
                         }}}},
//{$addFields: {budget:
//    {$cond: {if: { $or: [{$eq: [ "$budget", false ]},
//                         {$eq: [ "$budget", null ]},
//                         {$eq: [ "$budget", ""]},
//                         {$eq: [ "$budget", undefined ]}]}, then: "unknown",
//                         else: {$cond: {if: {$isNumber: "$budget"}, then: "$budget",
//                         else: {$trim: {input: "$budget", chars: " USD"}}
//                         }}
//                         }}}},
//{$addFields: {budget: {$toString: "$budget"}}},
//{$addFields: {budget: {$trim: {input: "$budget", chars: "$"}}}},
//    {$project: {budget:1, _id: 0}}
{$group: {_id: "$budget", count: {$sum: 1}}},

{$project: {budget: "$_id", count: 1,_id: 0}},
{$sort: {budget: 1}}

]);
