import { Router } from 'express';

export default ({ config }) => {
	// eslint-disable-next-line new-cap
	const routes = Router();

	// add middleware here
	routes.use((req, res, next) => {
		// check header for the token
		const token = req.headers['access-token'];
		if (token) {
			if (token !== config.secret) {
				return res.json({
					message: '401 Not Authorized'
				});
			} else next();
		} else {
			res.send({
				message: '401 Not Authorized'
			});
		}
  });
	return routes;
};
