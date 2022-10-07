ARG CONTAINER_VERSION

FROM node:${CONTAINER_VERSION}

ARG CONTAINER_VERSION
ENV CONTAINER_NODE_VERSION=${CONTAINER_VERSION}

ARG TYPE
ENV EXECUTE_TYPE=${TYPE}

VOLUME ["/app"]
WORKDIR /app

COPY docker-entrypoint.sh /usr/local/bin/
RUN ln -s /usr/local/bin/docker-entrypoint.sh

ARG GROUP_ID
ARG USER_ID
ENV USER_NAME="abc123def456ghi789"

RUN if ! id -gn "${GROUP_ID}" > /dev/null 2>&1; then echo "create new group: ${USER_NAME} with id *${GROUP_ID}*"; addgroup --gid "${GROUP_ID}" "${USER_NAME}"; fi
RUN if ! id -un "${USER_ID}" > /dev/null 2>&1; then echo "create new user: ${USER_NAME} with id *${USER_ID}* for group id *${GROUP_ID}*"; useradd "${USER_NAME}" -m -l -u "${USER_ID}" -g "${GROUP_ID}"; fi

RUN chown "${USER_ID}":"${GROUP_ID}" /usr/local/bin/docker-entrypoint.sh \
    && chmod 0774 /usr/local/bin/docker-entrypoint.sh

USER "${USER_ID}":"${GROUP_ID}"

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node"]
