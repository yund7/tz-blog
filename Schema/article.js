const { Schema } = require('./config')
const ObjectId = Schema.Types.ObjectId //类型为 ObjectId

const ArticleSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: ObjectId, //类型为 ObjectId
    ref: "users" //关联的表名
  }, // 关联 users 的表。。。
  tips: String,
  commentNum: Number
}, {
  versionKey: false, //不加这一段,save保存记录时,当条数据默认最后会有一个字段"__v",这个字段表示该文档是否是刚刚创建的,如果是则为0
  timestamps: {
    createdAt: "created" //自动加上创建时间,还会加上更新时间,存的是utc时间
  }
})


ArticleSchema.post('remove', doc => {
  const Comment = require('../Models/comment')
  const User = require('../Models/user')

  const { _id:artId, author: authorId } = doc

  // 只需要用户的 articleNum -1
  User.findByIdAndUpdate(authorId, {$inc: {articleNum: -1}}).exec()
  // 把当前需要删除的文章所关联的所有评论  一次调用 评论 remove
  Comment.find({article: artId})
    .then(data => {
      data.forEach(v => v.remove())
    })
})


module.exports = ArticleSchema