const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const name = "AMAE";
const email = "apaeGM@gmail.com";
const whatsapp = "01234567890";
const city = "Guarani das Missões";
const uf = "RS";
let id;

describe('ONG', ()=> {
    beforeAll(async () => {
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
                name: `${name}`,
                email: `${email}`,
                whatsapp: `${whatsapp}`,
                city: `${city}`,
                uf: `${uf}`
            })
            .expect('Content-Type', /json/)
            .expect(200);
        
        if(!response.body.id) throw ({"Error": "ID not returned"});

        id = response.body.id;
        console.log(response.body);
    });

    it('should return all ongs registered', async () =>{
        const response = await request(app).get('/ongs')
            .expect('Content-Type', /json/)
            .expect(200);

        if(!response.body[0].name) throw ({"Error":"Name not returned"});
        if(!response.body[0].email) throw ({"Error":"Email not returned"});
        if(!response.body[0].whatsapp) throw ({"Error":"Whatsapp not returned"});
        if(!response.body[0].city) throw ({"Error":"City not returned"});
        if(!response.body[0].uf) throw ({"Error":"UF not returned"});
        if(!response.body[0].id) throw ({"Error":"ID not returned"});
          

        if(response.body[0].name != name) throw ({"Error":"Name registered is not name found"});
        if(response.body[0].email != email) throw ({"Error":"Email registered is not email found"});
        if(response.body[0].whatsapp != whatsapp) throw ({"Error":"Whatsapp registered is not whatsapp found"});
        if(response.body[0].city != city) throw ({"Error":"City registered is not city found"});
        if(response.body[0].uf != uf) throw ({"Error":"UF registered is not UF found"});
        if(response.body[0].id != id) throw ({"Error":"ID registered is not ID found"});
        
        console.log(response.body);
    });

    it('should return the data of a specific ONG', async () => {
        const response = await request(app)
        .post('/sessions')
        .send({id: `${id}`})
        .expect('Content-Type', /json/)
        .expect(200);

        if(!response.body.name) throw ({"Error": "Name not returned"});
        if(response.body.name != name) throw ({"Error":"Name registered is not name found"});
        
        console.log(response.body);
    });
});

//.set('authorization')
//