# Development image only. Production images are out of scope for now.
FROM node:22.23.3-alpine@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402

ENV NODE_ENV=development

WORKDIR /app
RUN chown node:node /app
USER node

# Install dependencies first so this layer is cached until the lockfile changes.
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
