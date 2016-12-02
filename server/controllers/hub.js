const moment = require('moment');

const hubPoller = require('../pollers/hub');

const addTrackingId = item => {
	const trackingId = item.title.toLowerCase()
		.replace(/[^\s\w]/g, '')
		.replace(/\s+/g, '-');
	return Object.assign({}, item, { trackingId });
};

const addTeaserType = video => {
	let type = '';
	if (video.isOpinion) {
		type = 'opinion';
	} else if (video.isEditorsChoice) {
		type = 'editors-pick';
	}
	return Object.assign({}, video, { type });
};

const addFormattedDuration = video => {
	const duration = moment(video.duration);
	return Object.assign({}, video, { formattedDuration: `${duration.minutes()}.${duration.seconds()}min` });
};

module.exports = (req, res, next) => {
	res.nextMetricsName = 'hub';
	const useLatestHeroStyling = 'latest-hero-styling' in req.query;
	hubPoller.getData()
		.then(({
			data: {
				video: {
					hero: [hero] = [],
					editorsPicks = [],
					popular = []
				} = {},
				world = {},
				markets = {},
				opinion = {},
				companies = {},
				shortView = {},
				lex = {},
				lifeAndArts = {},
				workAndCareers = {}
			} = {}
		} = {}) => {
			const sections = [world, markets, opinion, companies, shortView, lex, lifeAndArts, workAndCareers];
			const slices = [
				{
					title: 'Editor’s Choice',
					id: 'editors-picks',
					videos: editorsPicks
				},
				{
					title: 'Trending',
					id: 'popular',
					videos: popular
				},
				...sections
			]
				.filter(({ videos = [] } = {}) => videos.length)
				.map(addTrackingId)
				.map(slice => {
					const videos = slice.videos.map(addTeaserType);
					return Object.assign({}, slice, { videos })
				});
			res.render('hub', {
				layout: 'wrapper',
				title: 'Financial Times | Videos',
				useLatestHeroStyling,
				hero: addFormattedDuration(hero),
				slices
			});
		})
		.catch(next);
};
