# Build a [ChatGPT Plugin](https://platform.openai.com/docs/plugins/introduction) with Deno

## Generate openapi spec

```bash
deno task openapi
```

## Run locally

```bash
deno task start
```

## Install in ChatGPT

You can test your plugin locally by going to https://chat.openai.com/ > Plugins
(you need to be enabled for the beta) > Plugin Store > Develop your own plugin >
Domain: localhost:8000

## Automatic Deployment with Deno Deploy

These steps show you how to deploy your ChatGPT Plugin close to your users at
the edge with [Deno Deploy](https://deno.com/deploy).

1. Clone this repository.

2. Sign into [Deno Deploy](https://dash.deno.com) with your GitHub account.

3. Select your GitHub organization or user, repository, and branch

4. Select "Automatic" deployment mode and `main.ts` as the entry point

5. Click "Link", which will start the deployment.
