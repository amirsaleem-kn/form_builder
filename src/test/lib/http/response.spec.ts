import { expect } from "chai";
import chai from "chai";
import httpMock from "node-mocks-http";
import sinonChai from "sinon-chai";
import Http from "../../../lib/http/http";

chai.use(sinonChai);

describe("HTTP Module", () => {
    describe("Response", () => {

        const response = httpMock.createResponse();

        it("should send status code 200", () => {
            Http.Response.success(response, {});
            expect(response.statusCode).equal(200);
        });

        it("should send status code 201", () => {
            Http.Response.created(response, {});
            expect(response.statusCode).equal(201);
        });

        it("should send status code 404", () => {
            Http.Response.notFound(response);
            expect(response.statusCode).equal(404);
        });

        it("should send status code 409", () => {
            Http.Response.conflict(response, {});
            expect(response.statusCode).equal(409);
        });

        it("should send status code 403", () => {
            Http.Response.forbidden(response);
            expect(response.statusCode).equal(403);
        });

        it("should send status code 503", () => {
            Http.Response.serviceError(response);
            expect(response.statusCode).equal(503);
        });

        it("should send status code 400", () => {
            Http.Response.badRequest(response, {});
            expect(response.statusCode).equal(400);
        });

        it("should send status code 401", () => {
            Http.Response.unauthorised(response);
            expect(response.statusCode).equal(401);
        });

    });
});
