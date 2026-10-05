# Development image only. Production images are out of scope for now.
FROM node:22-alpine

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
