const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

const title = "Catioro atropelado";
const description = "O catioro tava lá de boa e passaram por cima";
const value = 200; 
let id;

const name = "AMAE";
const email = "apaeGM@gmail.com";
const whatsapp = "01234567890";
const city = "Guarani das Missões";
const uf = "RS";
let ong_id;

describe('Incident', () => {
    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();

        const ong = await request(app).post('/ongs').send({
            name: `${name}`,
            email: `${email}`,
            whatsapp: `${whatsapp}`,
            city: `${city}`,
            uf: `${uf}`
        });

        ong_id = ong.body.id;
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should create a new incident', async () => {
        const response = await request(app)
            .post('/incidents')
            .send({
                title: `${title}`,
                description: `${description}`,
                value: `${value}`
            })
            .set({Authorization: ong_id})
            .expect('Content-Type', /json/)
            .expect(200);

        if(!response.body.id) throw ({"Error": "ID not returned"});
        
        id = response.body.id;
        console.log(response.body);
    });

    it('should list all incidents registered', async () => {
        const response = await request(app).get("/incidents")
            .expect("Content-Type", /json/)
            .expect(200);
        
        if(!response.body[0].id) throw ({"Error": "ID was not returned"});
        if(!response.body[0].title) throw ({"Error": "Title was not returned"});
        if(!response.body[0].description) throw ({"Error": "Description was not returned"});
        if(!response.body[0].value) throw ({"Error": "Value was not returned"});
        if(!response.body[0].ong_id) throw ({"Error": "ONG ID was not returned"});
        if(!response.body[0].name) throw ({"Error": "Name was not returned"});
        if(!response.body[0].email) throw ({"Error": "Email was not returned"});
        if(!response.body[0].whatsapp) throw ({"Error": "Whatsapp was not returned"});
        if(!response.body[0].city) throw ({"Error": "City was not returned"});
        if(!response.body[0].uf) throw ({"Error": "UF was not returned"});

        if(response.body[0].id != id) throw ({"Error": "ID registered was not ID found"});
        if(response.body[0].title != title) throw ({"Error": "Titke registered was not title found"});
        if(response.body[0].description != description) throw ({"Error": "Description registered was not description found"});
        if(response.body[0].value != value) throw ({"Error": "Value registered was not value found"});
        if(response.body[0].ong_id != ong_id) throw ({"Error": "ONG ID registered was not ONG ID found"});
        if(response.body[0].name != name) throw ({"Error": "Name registered was not name found"});
        if(response.body[0].email != email) throw ({"Error": "Email registered was not email found"});
        if(response.body[0].whatsapp != whatsapp) throw ({"Error": "Whatsapp registered was not whatsapp found"});
        if(response.body[0].city != city) throw ({"Error": "City registered was not city found"});
        if(response.body[0].uf != uf) throw ({"Error": "UF registered was not uf found"});

        console.log(response.body);
    });

    it('should list all incidents of a specific ong', async () => {
        const response = await request(app).get("/profile")
            .set({Authorization: ong_id})
            .expect("Content-Type", /json/)
            .expect(200);
        
        if(!response.body[0].id) throw ({"Error": "ID was not returned"});
        if(!response.body[0].title) throw ({"Error": "Title was not returned"});
        if(!response.body[0].description) throw ({"Error": "Description was not returned"});
        if(!response.body[0].value) throw ({"Error": "Value was not returned"});
        if(!response.body[0].ong_id) throw ({"Error": "ONG ID was not returned"});

        if(response.body[0].id != id) throw ({"Error": "ID registered was not ID found"});
        if(response.body[0].title != title) throw ({"Error": "Titke registered was not title found"});
        if(response.body[0].description != description) throw ({"Error": "Description registered was not description found"});
        if(response.body[0].value != value) throw ({"Error": "Value registered was not value found"});
        if(response.body[0].ong_id != ong_id) throw ({"Error": "ONG ID registered was not ONG ID found"});


        console.log(response.body);
    });

    it('should delete an incident', async () => {
        const response = await request(app)
        .delete(`/incidents/${id}`)
        .set({Authorization: ong_id})
        .expect(204);

        console.log(response.status);
    });
});