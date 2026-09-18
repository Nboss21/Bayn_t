#!/bin/sh
set -e

php artisan migrate --force
php artisan db:seed --force
php artisan storage:link --force || true
php artisan package:discover --ansi
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec apache2-foreground