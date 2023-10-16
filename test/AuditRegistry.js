const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Registry contract", function () {
  beforeEach(async function () {
    this.testToken = "0xae78736Cd615f374D3085123A210448E74Fc6393";
    this.zeroAddress = "0x0000000000000000000000000000000000000000";
    this.expectedHash = "0xe34255314ec42825a6444800e6894665b8c74e84e9dd2f20866f7057812b3adf";
    this.validReportLink = "https://example.com/report.pdf";
    this.invalidReportLink = "invalid://foo";

    this.registry = await ethers.deployContract("AuditRegistry");
  });

  it("exposes a code hash view function", async function () {
    const codeHash = await this.registry.getCodeHash(this.testToken);
    expect(codeHash).to.equal(this.expectedHash);
  });

  it("does not have any artifacts for new addresses", async function () {
    const artifacts = await this.registry.getArtifacts(this.testToken);
    expect(artifacts).to.be.an("array").that.is.empty;
  });

  it("successfully adds a new artifact on valid params", async function () {
    [owner] = await ethers.getSigners();
    const tx = await this.registry.connect(owner).add(this.testToken, this.validReportLink, []);
    const receipt = await tx.wait();

    expect(receipt.events).to.have.length.of(1);
    expect(receipt.events[0].event).to.be.equals("Added");

    const artifacts = await this.registry.getArtifacts(this.testToken);
    expect(artifacts).to.have.length.of(1);
    expect(artifacts[0].owner).to.be.equals(owner.address);
    expect(artifacts[0].codeHash).to.be.equals(this.expectedHash);
    expect(artifacts[0].link).to.be.equals(this.validReportLink);
    expect(artifacts[0].related).to.be.an("array").that.is.empty;
  });

  it("successfully removes a new artifact", async function () {
    [owner] = await ethers.getSigners();
    const addTx = await this.registry.connect(owner).add(this.testToken, this.validReportLink, []);
    const addReceipt = await addTx.wait();

    expect(addReceipt.events).to.have.length.of(1);
    expect(addReceipt.events[0].event).to.be.equals("Added");

    const removeTx = await this.registry.connect(owner).remove(this.testToken, 0);
    const removeReceipt = await removeTx.wait();

    expect(removeReceipt.events).to.have.length.of(1);
    expect(removeReceipt.events[0].event).to.be.equals("Removed");

    const artifacts = await this.registry.getArtifacts(this.testToken);
    expect(artifacts).to.be.an("array").that.is.empty;
  });

  it("reverts on an invalid report link", async function () {
    [owner] = await ethers.getSigners();

    const addTx = this.registry.connect(owner).add(this.testToken, this.invalidReportLink, []);
    await expect(addTx).to.be.revertedWith("Invalid report link prefix");
  });

  it("reverts when address has no code", async function () {
    [owner] = await ethers.getSigners();

    const addTx = this.registry.connect(owner).add(this.zeroAddress, this.validReportLink, []);
    await expect(addTx).to.be.revertedWith("No code at target address");
  });

  it("reverts when index is invalid", async function () {
    [owner, addr2] = await ethers.getSigners();

    const addTx = await this.registry.connect(owner).add(this.testToken, this.validReportLink, []);
    await addTx.wait();

    const removeTx = this.registry.connect(addr2).remove(this.testToken, 1);
    await expect(removeTx).to.be.revertedWith("Invalid artifact index");
  });

  it("reverts when sender not authorized", async function () {
    [owner, addr2] = await ethers.getSigners();

    const addTx = await this.registry.connect(owner).add(this.testToken, this.validReportLink, []);
    await addTx.wait();

    const removeTx = this.registry.connect(addr2).remove(this.testToken, 0);
    await expect(removeTx).to.be.revertedWith("Unauthorized action on artifact");
  });
});
