FROM mcr.microsoft.com/devcontainers/php:1-8.3-bookworm

RUN docker-php-ext-install pdo_sqlite
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer
