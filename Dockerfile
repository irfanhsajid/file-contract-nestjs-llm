FROM artifactory.natera.com/dockerhub/node:22.13-slim

ARG DD_GIT_REPOSITORY_URL
ARG DD_GIT_COMMIT_SHA
ENV DD_GIT_REPOSITORY_URL=${DD_GIT_REPOSITORY_URL} 
ENV DD_GIT_COMMIT_SHA=${DD_GIT_COMMIT_SHA}

COPY . /srv/clinverify-back
WORKDIR /srv/clinverify-back

RUN npm ci && npm run build
ENV NODE_ENV=production
ENV PORT=3000

VOLUME /srv/clinverify-back/log

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]
