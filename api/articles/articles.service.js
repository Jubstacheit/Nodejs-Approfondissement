const Article = require('./articles.model');

class ArticleService {
	create(data) {
		const article = new Article(data);
		return article.save();
	}
	update(id, data) {
		return Article.findByIdAndUpdate(id, data, { new: true });
	}
	delete(id) {
		return Article.deleteOne({ _id: id });
	}
	// getUserArticles method with populate() method
	getUserArticles(user) {
		return Article.find({ user: user }).populate('user');
	}
}

module.exports = new ArticleService();