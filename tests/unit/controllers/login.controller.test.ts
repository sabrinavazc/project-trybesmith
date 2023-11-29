import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginService from '../../../src/service/login.service';
import loginController from '../../../src/controller/login.controller';

chai.use(sinonChai);

describe('LoginController', function () {
  // const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  
  it('Test if work correctly with valid request', async function () {
    sinon.stub(loginService, 'verifyLogin').resolves({
      status: 'SUCCESSFUL',
      data: { token: 'tokenTest' }
    });

    const req = {body: { username: 'test', password: 'pass' }} as Request;

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: 'tokenTest' });
  });
  
  it('Test if fields are blank', async function () {
    const req = { body: { username: '', password: '' } } as Request;
  
    await loginController.login(req, res);
  
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" is not allowed to be empty' });
  });
});
