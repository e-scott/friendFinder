var friends = require('../data/friends.js');


// API GET Requests - when users "visit" a page. 
// (ex:localhost:PORT/api/admin...they are shown a JSON of the data in the table) 



module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

//API POST Request-handles when user submits a form & thus submits data to the server.
// In each of the below cases, when a user submits form data (a JSON object)
// ...the JSON is pushed to the appropriate Javascript array


	app.post('/api/friends', function(req, res){
        var totalDifference = 0;
		var greatMatch = {
			name: "",
			photo: "",
			matchDifference: 1000
		};
		var userData 	= req.body;
		var userName 	= userData.name;
		var userScores 	= userData.scores;

		var b = userScores.map(function(item){
            return parseInt(item, 10);
        });

        userData = {
            "name": req.body.name,
            "photo": req.body.photo,
            "scores": b
        }

        console.log("Name: " + userName);
        console.log("User Score " + userScores);
        var sum = b.reduce((a, b) => a + b, 0);
        console.log("Sum of users score " + sum);
        console.log("Great Match " + greatMatch.matchDifference);
        console.log("\n------------------------\n")

        //loop through the friends data array of objects to get each friends scores
        
		for(var i = 0; i < friends.length; i++){
			console.log(friends[i].name);
			totalDifference = 0;
            console.log("Total diff " + totalDifference);
            console.log("Great Match diff " + greatMatch.matchDifference);

            var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
            console.log("Total friend score " + bfriendScore);
            totalDifference += Math.abs(sum - bfriendScore);
			//loop through that friends score and the users score and calculate the 
			// absolute difference between the two and push that to the total difference variable set above
				// We calculate the difference between the scores and sum them into the totalDifference
				if (totalDifference <= greatMatch.matchDifference){

					// Reset the greatMatch to be the new friend. 
					greatMatch.name = friends[i].name;
					greatMatch.photo = friends[i].photo;
					greatMatch.matchDifference = totalDifference;
				//}
            }
            console.log(totalDifference + "Total Difference");
		}
        console.log(greatMatch);
		friends.push(userData);
        console.log('New user added');
        console.log(userData);
		res.json(greatMatch);
	});
};
