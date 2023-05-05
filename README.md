# Build a ChatGPT Plugin with Deno

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

## Deploy

[![Deploy this example](https://deno.com/docs/deno-deploy-button.svg)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/thorwebdev/deno-chatgpt-plugin-starter/main/main.ts)
