#!/usr/bin/env bash
set -euo pipefail
cd /workspaces/nextjs-laravel/backend
touch database/database.sqlite
php artisan migrate --force
