import Read from '../model/ReadModel'

class ReadController{
    async getBookList(ctx){
        ctx.body = await Read.getAllBooks()
    }
    async deletebook(ctx){
        const id = ctx.params.id
        ctx.body = await Read.deletebook(id)
    }
    async addbook(ctx){
        const name = ctx.request.body.name
        const author = ctx.request.body.author
        const score = ctx.request.body.score
        ctx.body = await Read.addbook(name,author,score)
    }
    async updatebook(ctx) {
        const id = ctx.params.id
        const name = ctx.request.body.name
        const author = ctx.request.body.author
        const score = ctx.request.body.score
        ctx.body = await Read.updateBook(id,name,author,score)
    }
}
export default new ReadController()