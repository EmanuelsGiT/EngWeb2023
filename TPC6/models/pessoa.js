var mongoose = require ('mongoose')


const moradaSchema = new mongoose.Schema({
        cidade: String,
        distrito: String,
        _id: String
});

const partido_politicoSchema = new mongoose.Schema({
        party_abbr: String,
        party_name: String,
        _id: String // se puser assim nao cria ele id (rever !!!!)
});

const atributosSchema = new mongoose.Schema({
        fumador: Boolean,
        gosta_cinema: Boolean,
        gosta_viajar: Boolean,
        acorda_cedo: Boolean,
        gosta_ler: Boolean,
        gosta_musica: Boolean,
        gosta_comer: Boolean,
        gosta_animais_estimacao: Boolean,
        gosta_dancar: Boolean,
        comida_favorita: String,
        _id: String
});


var pessoaSchema = new mongoose.Schema({
        nome: String,
        idade: Number,
        morada: {
            type: moradaSchema,
            required: false 
        },
        BI: String,
        CC: String,
        descrição : String,
        profissao: String,
        partido_politico: {
                type: partido_politicoSchema,
                required: false
        },
        religiao: String,
        desportos: [String],
        animais: [String],
        figura_publica_pt: [String],
        marca_carro: String,
        destinos_favoritos: [String],
        atributos: {
                type: atributosSchema,
                required: false
        },
        _id: String
});


module.exports = mongoose.model('pessoa',pessoaSchema)


/*
Outras maneiras de fazer o schmea

1-------------------------


var pessoaSchema = new mongoose.Schema({
        nome: String,
        idade: Number,
        morada: {
            type: Map,
            of: String
        },
        BI: String,
        CC: String,
        profissao: String,
        partido_politico: {
            type: Map,
            of: String
        },
        religiao: String,
        desportos: [String],
        animais: [String],
        figura_publica_pt: [String],
        marca_carro: String,
        destinos_favoritos: [String],
        atributos: {
            type: Map,
            of: String
        },
        _id: String
});

----------------------------------------

var pessoaSchema= new mongoose.Schema({
        _id:String,
        nome:String,
        idade:Number,
        sexo: String,
        data:String,
        morada: {
         cidade: String,
         distrito: String
        },
        BI: String,
        profissao: String,
        descrição : String,
        partido_politico: {
         party_abbr: String,
         party_name: String
        },
        religiao : String,
        desportos: [String],
        animais: [String],
        figura_publica_pt:[String],
        marca_carro: String,
        destinos_favoritos: [String],
        atributos: {
         fumador: Boolean,
         gosta_cinema: Boolean,
         gosta_viajar: Boolean,
         acorda_cedo: Boolean,
         gosta_ler: Boolean,
         gosta_musica: Boolean,
         gosta_comer: Boolean,
         gosta_animais_estimacao: Boolean,
         gosta_dancar: Boolean,
         comida_favorita: String
        }
})

*/