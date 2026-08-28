FROM mcr.microsoft.com/devcontainers/php:1-8.3-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends libsqlite3-dev pkg-config \
    && docker-php-ext-install pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
