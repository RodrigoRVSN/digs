import { expect } from "chai";
import { ethers } from "hardhat";

describe("HelloWorld", function () {
  it("Should return the new greeting once it's changed", async function () {
    const helloWorld = await ethers.getContractFactory("HelloWorld");
    const HelloWorld = await helloWorld.deploy("Hello, world!");
    await HelloWorld.deployed();

    expect(await HelloWorld.greet()).to.equal("Hello, world!");

    const setGreetingTx = await HelloWorld.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await HelloWorld.greet()).to.equal("Hola, mundo!");
  });
});
