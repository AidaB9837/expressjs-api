const { discordVerifyFunction } = require("../../strategies/discord");
const DiscordUser = require("../../database/schemas/DiscordUser");

//mock entire module
jest.mock("../../database/schemas/DiscordUser");

//create fake params values
const accessToken = "123";
const refreshToken = "456";
const profile = {
  id: "123123123",
};
const done = jest.fn((x) => x);

//TEST Discord Login Strategy
describe("Discord Verify Function", () => {
  //START - Test "if" block: returns user if found
  it("dovrebbe restituire l'utente se trovato", async () => {
    //create fake Discord User data
    const mockedUser = {
      id: "id_123",
      discordId: profile.id,
      createdAt: new Date(),
    };

    //search fake user in DB
    DiscordUser.findOne.mockResolvedValueOnce(mockedUser);
    await discordVerifyFunction(accessToken, refreshToken, profile, done);
    expect(DiscordUser.findOne).toHaveBeenCalledWith({
      discordId: "123123123",
    });
    expect(done).toHaveBeenCalledWith(null, mockedUser);
  });
  //END - Test "if" block.

  //START - Test "else" block: user does not exist, then, create new user
  it("dovrebbe creare un nuovo utente & restituire se non trovato", async () => {
    const newProfile = {
      id: "1234",
    };

    //create fake New User data
    const newUser = {
      id: 1,
      discordId: "1234",
      createdAt: new Date(),
    };

    DiscordUser.create.mockResolvedValueOnce(newUser);
    DiscordUser.findOne.mockImplementationOnce(() => undefined);

    await discordVerifyFunction(accessToken, refreshToken, newProfile, done);
    expect(DiscordUser.findOne).toHaveBeenCalledWith({
      discordId: newProfile.id,
    });
    expect(DiscordUser.findOne).toHaveReturnedWith(undefined);
    expect(DiscordUser.create).toHaveBeenCalledWith({ discordId: "1234" });
    expect(done).toHaveBeenCalledWith(null, newUser);
  });
  //END - Test "else" block.
});
