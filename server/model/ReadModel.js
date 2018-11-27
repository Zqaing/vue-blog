import query from '../utils/query'
import eacape from '../utils/eacape'

class ReadModel{
    async getAllBooks() {
        return await query(`SELECT * FROM RD_LIST`)
    }
    async addbook(name, author, score) {
        return await query(`INSERT INTO RD_LIST SET name='${name}',author='${author}',score='${score}'`)
    }

    async updateBook(id, name, author, score) {
        return await query(`UPDATE RD_LIST SET name='${name}',author='${author}',score='${score}' WHERE id='${id}'`)
    }
    async deletebook(id){
        return await query(eacape`DELETE FROM RD_LIST WHERE id=${id}`)
    }
}

export default new ReadModel()