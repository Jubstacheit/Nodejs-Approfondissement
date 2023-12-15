const request = require('supertest');
const { app } = require('../server');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const Article = require('../api/articles/articles.model');
const articlesService = require('../api/articles/articles.service');

describe('test API articles', () => {
	let token;
	const USER_ID = mongoose.Types.ObjectId();
	const ARTICLE_ID = mongoose.Types.ObjectId();
	// Mock data for article 
	const MOCK_DATA = [
		{
			_id: ARTICLE_ID,
			title: 'test',
			content: 'test',
		},
	];
	// Mock data for article created
	const MOCK_DATA_CREATED = {
		title: 'testCreate',
		content: 'testCreate',
	};
	
	beforeEach(() => {
		token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);
		mockingoose(Article).toReturn(MOCK_DATA, "find");
		mockingoose(Article).toReturn(MOCK_DATA_CREATED, "insertMany");
	});
	
	// Test to create an article
	test('[Articles] Create Article', async () => {
		const res = await request(app)
		.post('/api/articles')
		.send(MOCK_DATA_CREATED)
		.set('x-access-token', token);
		expect(res.status).toBe(201);
		expect(res.body.title).toBe(MOCK_DATA_CREATED.title);
		console.log(res.body);
	});

	// Test to update an existing article 
	test('[Articles] Update Article', async () => {
		const res = await request(app)
		.put(`/api/articles/${ARTICLE_ID}`)
		.send(MOCK_DATA)
		.set('x-access-token', token);
		expect(res.status).toBe(200);
		expect(res.body.title).toBe(MOCK_DATA.title);
	});
	
	// Test to delete an existing article
	test('[Articles] Delete Article', async () => {
		const res = await request(app)
		.delete(`/api/articles/${ARTICLE_ID}`)
		.set('x-access-token', token);
		expect(res.status).toBe(204);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
});
