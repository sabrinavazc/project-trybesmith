import { expect } from 'chai';
import sinon from 'sinon';
import loginService from '../../../src/service/login.service';
import UserModel from '../../../src/database/models/user.model';
import { User } from '../../../src/types/User';


describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  const fakeUser: User = {
    id: 1,
    level: 1,
    password: '$2y$10$grVqJMS7wPyLVo4M.yQ4b.hVwZsaDdX/8t1eo4k2kG2MaizIsIHuu',
    username: 'test',
    vocation: 'Dev',
  };
  
  it('Test if you can login correctly', async function () {

    const mock = {
      username: 'test',
      password: 'pass',
    };

    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(fakeUser));

    const serviceResponse = await loginService.verifyLogin(mock);

    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
  });
  it('Test if user does not exist', async function () {
    const mock = {
      username: 'nonexistentUser',
      password: 'pass',
    };
  
    sinon.stub(UserModel, 'findOne').resolves(null);
  
    const serviceResponse = await loginService.verifyLogin(mock);
  
    expect(serviceResponse.status).to.be.equal('UNAUTHORIZED');
  });
  
  it('Test if password is incorrect', async function () {
    const mock = {
      username: 'test',
      password: 'incorrectPassword',
    };
  
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(fakeUser));
  
    const serviceResponse = await loginService.verifyLogin(mock);
  
    expect(serviceResponse.status).to.be.equal('UNAUTHORIZED');
  });
  
  it('Test if fields are blank', async function () {
    const mock = {
      username: '',
      password: '',
    };
  
    const serviceResponse = await loginService.verifyLogin(mock);
  
    expect(serviceResponse.status).to.be.equal('BAD_REQUEST');
  });
});