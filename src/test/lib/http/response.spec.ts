import { expect } from "chai";
import chai from "chai";
import httpMock, { MockResponse } from "node-mocks-http";
import sinonChai from "sinon-chai";
import HttpResponse from "../../../lib/http/response";

chai.use(sinonChai);

describe("HTTP Module", () => {
    describe("Response", () => {

        let response: MockResponse<any>  = null;

        beforeEach(() => {
            response = httpMock.createResponse();
        });

        afterEach(() => {
            response = null;
        });

        it("should send response with status code 200 when no status is set", () => {
            const res = new HttpResponse(response);
            res.send();
            expect(response.statusCode).equal(200);
        });

        it("should send response with status code 201", () => {
            const res = new HttpResponse(response);
            res.status = 201;
            res.send();
            expect(response.statusCode).equal(201);
        });

        it("should accept any kind of parameter in call to send function", () => {
            const res = new HttpResponse(response);
            res.status = 200;
            res.send("string");
            expect(response.statusCode).equal(200);
        });

        it("should update the status using status setter", () => {
            const res = new HttpResponse(response);
            res.status = 422; // call to setter
            expect(res.status).to.equals(422); // call to getter and expect the result
        });

        it("should send auto response when called with raw", () => {
            const res = new HttpResponse(response);
            res.status = 200;
            res.raw().send("string");
            expect(response.statusCode).equal(200);
        });

        it("should include data key when called with send", () => {
            const res = new HttpResponse(response);
            res.status = 200;
            res.send({ username: "some_username_1876" });
            const body = response._getJSONData();
            expect(response.statusCode).equal(200);
            expect(body).to.property("data");
        });

        it("should include errors key when called with error", () => {
            const res = new HttpResponse(response);
            res.status = 200;
            res.error([]);
            const body = response._getJSONData();
            expect(response.statusCode).equal(200);
            expect(body).to.property("errors");
            expect(body.errors).to.be.an("array");
        });

    });
});
