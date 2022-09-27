const { authRegisterController } = require("../../controllers/auth");
const User = require("../../database/schemas/User");
const { hashPassword } = require("../../utils/helpers");

//mock entire modules
jest.mock("../../utils/helpers", () => ({
  hashPassword: jest.fn(() => "hash password"),
}));
jest.mock("../../database/schemas/User");

//create a fake request object to passed fake data
const request = {
  body: {
    email: "fake_email",
    password: "fake_password",
  },
};

//create a fake response object to passed fake data
const response = {
  //this is a mock function for status response's property
  status: jest.fn((x) => x),
  //this is a mock function for send response's property
  send: jest.fn((x) => x),
};

//TEST Authentication Register Controller
describe("Authentication Register Controller", () => {
  //START - first test: if block - user already exist in DB
  it("dovrebbe inviare uno status code 400 quando l'utente esiste già", async () => {
    //mock any methods from the User module

    //created a fake user for the test & using findOne method
    User.findOne.mockImplementationOnce(() => ({
      id: 1,
      email: "email",
      password: "password",
    }));
    await authRegisterController(request, response);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledTimes(1);
  });
  //END - Test "if" block

  //START - second test: else block - user does not exist in DB, then create a new user
  it("dovrebbe inviare uno status code 201 quando viene creato un nuovo utente", async () => {
    //created a fake unknow user for the test & using findOne & create methods
    User.findOne.mockResolvedValueOnce(undefined);
    User.create.mockResolvedValueOnce({
      id: 1,
      email: "email",
      password: "password",
    });
    await authRegisterController(request, response);
    expect(hashPassword).toHaveBeenCalledWith("fake_password");
    expect(User.create).toHaveBeenCalledWith({
      email: "fake_email",
      password: "hash password",
    });
    expect(response.send).toHaveBeenCalledWith(201);
  });
  //END - Test "else" block
});
