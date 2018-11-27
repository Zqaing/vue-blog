import Briefs from '../model/BriefsModel'

class BriefsController {
    async getBriefs(ctx){
        ctx.body = await Briefs.getBriefs()
    }
    async updateAbout(ctx){
        const id = ctx.request.body.id
        const content = ctx.request.body.content
        ctx.body = await Briefs.updateAbout(id,content)
    }

}

export default new BriefsController()