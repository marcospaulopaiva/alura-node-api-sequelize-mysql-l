const database = require('../models')

class PessoaController {
    static async pegaTodasAsPessoas(req, res){
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pagaPessoa(req, res){
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne( { where: { id: Number(id) }})
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res){
        const { id } = req.params
        const novaInfor = req.body
        try {
            await database.Pessoas.update(novaInfor, { where: {id: Number(id) }})
            const pessoaAtulizada = await database.Pessoas.findOne( { where: {id: Number(id) }})
            return res.status(200).json(pessoaAtulizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id)}})
            return res.status(200).json({message: `id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        } 
    }

    static async pagaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne( { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId) 
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body,  estudante_id: Number(estudanteId)} 
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        const novaInfor = req.body
        try {
            await database.Matriculas.update(novaInfor, { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            const matriculaAtulizada = await database.Matriculas.findOne( { 
                where: {
                    id: Number(matriculaId) 
                }
            })
            return res.status(200).json(matriculaAtulizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({ 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json({message: `id ${matriculaId} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        } 
    }

}

module.exports = PessoaController