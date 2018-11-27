import query from '../utils/query'
import escape from '../utils/eacape'
class BriefsModel{
    async getBriefs(){
        return await query(`SELECT * FROM ABOUT`)
    }
    async updateAbout(id,content){
        return await query(escape`UPDATE ABOUT SET content=${content} WHERE id=${id}`)
    }
}

export default new BriefsModel()
