const NotFoundError = require("../../errors/not-found.js");
const UnauthorizedError = require("../../errors/unauthorized.js");
const config = require("../../config/index.js");
const jwt = require("jsonwebtoken");
const articlesService = require("./articles.service");
const usersService = require("../users/users.service");

class ArticlesController {
	// Methods to create, update and delete an article
	async create(req, res, next) {
		try {
			const articleData = {
				...req.body,
				user: req.user.userId
			}
			const article = await articlesService.create(articleData);
			req.io.emit("article:create", article);
			res.status(201).json(article);
		} catch (err) {
			next(err);
		}
	}
	async update(req, res, next) {
		try {
			const id = req.params.id;
			const data = req.body;
			const articleModified = await articlesService.update(id, data);
			res.json(articleModified);
		} catch (err) {
			next(err);
		}
	}
	async delete(req, res, next) {
		try {
			const id = req.params.id;
			await articlesService.delete(id);
			req.io.emit("article:delete", { id });
			res.status(204).send();
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new ArticlesController();