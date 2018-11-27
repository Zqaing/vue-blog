import Tag from '../model/TagModel'

class TagController {
    async getTags(ctx){
        const tags = await Tag.getTags()
        ctx.body = tags
    }
    async updatetags(ctx){
        const id = ctx.params.id
        const tag = ctx.request.body.tag
        ctx.body = await Tag.updatetags(id,tag)
    }
}

export default new TagController()