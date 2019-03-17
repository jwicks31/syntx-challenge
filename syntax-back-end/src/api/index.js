import { version } from '../../package.json';
import { Router } from 'express';
import weather from './weather';

export default ({ config, db }) => {
	let api = Router();

	// mount the weather resource
	api.use('/weather', weather({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}