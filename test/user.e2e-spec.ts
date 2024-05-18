import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { ValidationPipe } from '@nestjs/common';
import { EquipmentModule } from '../src/equipment/equipment.module';
import { RequestModule } from '../src/request/request.module';
import { RepositoryModule } from '../src/repository/repository.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userMock = 
    {
        name: "Alice dos Santos",
        cpf: "12345678911",
        email: "jose@gmail.com",
        password: "kQJsef1231238<!f^",
    }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, EquipmentModule, RequestModule, RepositoryModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }));
    await app.init();
  });

  // Continuous e2e Test Cases for Empty Schema

  describe('route', () => {
    it('should return 404 (invalid route)', () => {
        return request(app.getHttpServer())
          .get('/thrash')
          .expect(404)
          .then((res) => {
            expect(res.body.message).toContain("Cannot GET")
          })
      });
  });

  describe('GET', () => {
    it('should return 200 (valid GET)', () => {
        return request(app.getHttpServer())
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(200)
    });
  });

  describe('POST', () => {
    it('should return 404 (invalid POST)', () => {
        return request(app.getHttpServer())
        .post('/user')
        .send({...userMock, thrash: "kasejflj"})
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) =>{
            expect(res.body.message).toContain("property thrash should not exist")
        })
    });

    it('should return 404 (invalid POST)', () => {
        const invalidUser = {
            name: 213,
            cpf: "",
            email: "jose 313 gmail.com",
            password: "aaaaa",
        }
        return request(app.getHttpServer())
        .post('/user')
        .send(invalidUser)
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) =>{
            expect(res.body.message).toContain("name must be a string")
            expect(res.body.message).toContain("cpf must be longer than or equal to 11 characters")
            expect(res.body.message).toContain("cpf must be a number string")
            expect(res.body.message).toContain("cpf should not be empty")
            expect(res.body.message).toContain("email must be an email")
            expect(res.body.message).toContain("password is not strong enough")
        })
    });

    it('should return 201 (valid POST)', () => {
        return request(app.getHttpServer())
        .post('/user')
        .send(userMock)
        .expect('Content-Type', /json/)
        .expect(201)
    });
    
  });

  describe('GET', () => {
    it('should return 200 (valid GET)', () => {
        return request(app.getHttpServer())
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should return 200 (valid GET by cpf)', () => {
        return request(app.getHttpServer())
        .get('/user/' + userMock.cpf)
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should return 404 (invalid GET by cpf)', () => {
        return request(app.getHttpServer())
        .get('/user/' + 14124124)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((res) =>{
            expect(res.body.message).toContain("User with CPF ")
        })
    });
  });

  describe('PATCH', () => {
    it('should return 400 (invalid PATCH)', () => {
        return request(app.getHttpServer())
        .patch('/user/' + userMock.cpf)
        .send({
            email: "some@email.com.br"
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) =>{
            expect(res.body.message).toContain("property email should not exist")
        })
    });
    it('should return 200 (valid PATCH)', () => {
        return request(app.getHttpServer())
        .patch('/user/' + userMock.cpf)
        .send({
            name: "Alice da Silva"
        })
        .expect('Content-Type', /json/)
        .expect(200)
    });
  });

  describe('DELETE', () => {
    it('should return 404 (invalid DELETE)', () => {
        return request(app.getHttpServer())
        .delete('/user/' + 14124124)
        .expect('Content-Type', /json/)
        .expect(404)
        .then((res) =>{
            expect(res.body.message).toContain("User with CPF ")
        })
    });
    it('should return 200 (valid DELETE)', () => {
        return request(app.getHttpServer())
        .delete('/user/' + userMock.cpf)
        .expect('Content-Type', /json/)
        .expect(200)
    });
  });

  describe('GET', () => {
    it('should return 200 (valid GET)', () => {
        return request(app.getHttpServer())
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(200)
    });
  });
});
