import { type Express, type Request, type Response } from "express";

import { HTTPCode, type HTTPMethod } from "../http/http.js";

type ControllerRouteParameters = {
  handler: (options: {
    body: unknown;
    headers: Request["headers"];
    params: unknown;
    query: unknown;
  }) =>
    | { payload: unknown; status: HTTPCode }
    | Promise<{ payload: unknown; status: HTTPCode }>;
  method: HTTPMethod;
  path: string;
};

class BaseController {
  public apiPath: string;

  public routes: ControllerRouteParameters[];

  public constructor(apiPath: string) {
    this.apiPath = apiPath;
    this.routes = [];
  }

  public addRoute(route: ControllerRouteParameters): void {
    this.routes.push(route);
  }

  public register(app: Express): void {
    for (const { handler, method, path } of this.routes) {
      const expressMethod = method.toLowerCase() as
        | "delete"
        | "get"
        | "patch"
        | "post"
        | "put";

      app[expressMethod](
        this.apiPath + path,
        async (request: Request, response: Response): Promise<void> => {
          try {
            const { payload, status } = await handler({
              body: request.body,
              headers: request.headers,
              params: request.params,
              query: request.query,
            });

            response.status(status).send(payload);
          } catch (error) {
            response
              .status(HTTPCode.INTERNAL_SERVER_ERROR)
              .send({ error: (error as Error).message });
          }
        },
      );
    }
  }
}

export { BaseController };
