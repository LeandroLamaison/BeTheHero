const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=> {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "AMAE",
                email: "apaeGM@gmail.com",
                whatsapp: "01234567890",
                city: "Guarani das Missões",
                uf: "RS"
            });
        
        console.log(response.body);
    });
});

//.set('authorization')
//