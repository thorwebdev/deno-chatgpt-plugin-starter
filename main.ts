import {
  Application,
  Router,
  Status,
} from "https://deno.land/x/oak@v11.1.0/mod.ts";

console.log("Hello from `chatgpt-plugin` Function!");

const _TODOS: { [key: string]: Array<string> } = {
  global: ["test this plugin template"],
};

/**
 * @openapi
 * components:
 *   schemas:
 *     getTodosResponse:
 *       type: object
 *       properties:
 *         todos:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of todos.
 */

const router = new Router();
router
  .get("/", (ctx) => {
    ctx.response.body = "Building ChatGPT plugins with Deno!";
  })
  /**
   * @openapi
   * /todos/{username}:
   *   get:
   *     operationId: getTodos
   *     summary: Get the list of todos
   *     parameters:
   *     - in: path
   *       name: username
   *       schema:
   *         type: string
   *       required: true
   *       description: The name of the user.
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/getTodosResponse'
   */
  .get("/todos/:username", (ctx) => {
    const username = ctx.params.username;
    ctx.response.body = _TODOS[username] ?? [];
  });

const app = new Application();
// ChatGPT specific CORS headers
app.use(async (context, next) => {
  await next();
  context.response.headers.set(
    "Access-Control-Allow-Origin",
    "https://chat.openai.com",
  );
  context.response.headers.set("Access-Control-Allow-Credentials", "true");
  context.response.headers.set("Access-Control-Allow-Private-Network", "true");
  context.response.headers.set("Access-Control-Allow-Headers", "*");
});
app.use(router.routes());
app.use(router.allowedMethods());

// static content
app.use(async (context, next) => {
  const paths = context.request.url.pathname.split("/");
  const fileName = paths.pop();
  const root = `${Deno.cwd()}/static${paths.reduce((a, v) => a + v + "/", "")}`;
  try {
    await context.send({ root, path: fileName });
  } catch {
    next();
  }
});

// page not found
app.use((context) => {
  context.response.status = Status.NotFound;
  context.response.body = `"${context.request.url}" not found`;
});

console.log("Listening on http://localhost:8000");
await app.listen({ port: 8000 });
