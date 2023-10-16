const { expect } = require("chai");

describe("Registry contract", function () {
  it("exposes a code hash view function", async function () {
    const registry = await ethers.deployContract("AuditRegistry");
    const codeHash = await registry.getCodeHash("0xae78736Cd615f374D3085123A210448E74Fc6393");
    expect(codeHash).to.equal("0xe34255314ec42825a6444800e6894665b8c74e84e9dd2f20866f7057812b3adf");
  });

  it("does not have any artifacts for new addresses", async function () {
    const registry = await ethers.deployContract("AuditRegistry");
    const artifacts = await registry.getArtifacts("0xae78736Cd615f374D3085123A210448E74Fc6393");
    expect(artifacts).to.be.an( "array" ).that.is.empty
  });
});
