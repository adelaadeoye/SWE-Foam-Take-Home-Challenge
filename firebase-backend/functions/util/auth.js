// const { admin, db } = require("./admin");

// module.exports = (request, response, next) => {
//   let idToken;
//   if (
//     request.headers.authorization &&
//     request.headers.authorization.startsWith("Bearer ")
//   ) {
//     idToken = request.headers.authorization.split("Bearer ")[1];
//   } else {
//     console.error("No token found");
//     return response.status(403).json({ error: "Unauthorized" });
//   }
//   admin
//     .auth()
//     .verifyIdToken(idToken)
//     .then((decodedToken) => {
//       request.user = decodedToken;
//       return next();

//       return db
//         .collection("users")
//         .where("userId", "==", request.user.userId)
//         .limit(1)
//         .get()
//         .then((data) => {
//           console.log("data", data);
//           request.user.email = data.docs[0].data().email;
//         });
//     })

//     .catch((err) => {
//       console.error("Error while verifying token", err);
//       return response.status(403).json(err);
//     });
// };

const { admin, db } = require('./admin');

module.exports = (request, response, next) => {
	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
		idToken = request.headers.authorization.split('Bearer ')[1];
	} else {
		console.error('No token found');
		return response.status(403).json({ error: 'Unauthorized' });
	}
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			request.user = decodedToken;
			return db.collection('users').where('userId', '==', request.user.uid).limit(1).get();
		})
		.then((data) => {
      // console.log('first', data.docs[0].data())
			// request.user.username = data.docs[0].data().username;
			// request.user.imageUrl = data.docs[0].data().imageUrl;
			return next();
		})
		.catch((err) => {
			console.error('Error while verifying token', err);
			return response.status(403).json({message:'Error while verifying token'});
		});
};
