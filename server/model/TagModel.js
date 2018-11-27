import query from '../utils/query'
import eacape from '../utils/eacape'

class TagModel {
    async getTags(){
        return await query(`SELECT TAGS FROM ARTICLE ORDER BY createTime DESC`)
    }
   async updatetags(id,tag){
        return await query(eacape`UPDATE ARTICLE SET tags=${tag} WHERE id=${id}`)
    }
}

export default new TagModel()