const router = require('express').Router();
const algoliaSearch = require('algoliasearch');

const client = algoliaSearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_KEY
);
const index = client.initIndex(process.env.ALGOLIA_INDEX);


// POST
router.post('/search', async (req, res) => {
    try {
        let result = await index.search(req.body.title);
        res.json(result.hits)

    } catch (err) {
        res.json(err.message)
    }
});

module.exports = router;