import chai from "chai";
import { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import Log from "../../../lib/logger/index";

chai.use(sinonChai);

describe("Logger", () => {

    beforeEach(() => {
        sinon.spy(console, "log");
        sinon.spy(console, "error");
        sinon.spy(console, "warn");
    });

    afterEach(() => {
        // tslint:disable
        delete console.log;
        delete console.error;
        delete console.warn;
    });

    it("should log something to the console", () => {
        Log.print("Hello World");
        expect(console.log).to.be.called;
    });

    it("should log multiple strings to the console", () => {
        Log.print("Hello World", "Hellow Universe");
        expect(console.log).to.be.called;
    });

    it("should log object to the console", () => {
        Log.print({ name: "bhutani" });
        expect(console.log).to.be.called;
    });

    it("should not log the console in production environment", () => {
        process.env.NODE_ENV = "production";
        Log.debug("Test");
        expect(console.log).not.to.be.called;
        process.env.NODE_ENV = undefined;
    });

    it("should log into the console in environment other than production", () => {
        process.env.NODE_ENV = "test";
        Log.debug("Test");
        expect(console.log).to.be.called;
        process.env.NODE_ENV = undefined;
    });

    it("should log into the console the error passed", () => {
        Log.error(new Error("Some Error has occurred"));
        expect(console.error).to.be.called;
    });

    it("should log into the console the string passed", () => {
        Log.error("Some Error has occurred");
        expect(console.error).to.be.called;
    });

    it("should log into the console the warning passed", () => {
        Log.warning("Some Warning");
        expect(console.warn).to.be.called;
    });

});
