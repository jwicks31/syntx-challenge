import { Router } from 'express';

export default ({ config }) => {
	// eslint-disable-next-line new-cap
	let routes = Router();

	// add middleware here
	routes.use((req, res, next) => {
    // check header for the token
    var token = req.headers['access-token'];
    // decode token
    if (token) {
      if (token !== config.secret) return res.json({
        message: '401 Not Authorized'
      });
			else next();
		} else {
			// if there is no token
			res.send({
				message: '401 Not Authorized'
			});
    }
  });

	return routes;
};
