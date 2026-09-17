# 1. Use the official PHP image with Apache
FROM php:8.3-apache

# 2. Install system dependencies and PHP extensions required by Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libpq-dev \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql gd zip bcmath opcache \
    && rm -rf /var/lib/apt/lists/*

# 3. Enable Apache mod_rewrite for Laravel routing
RUN a2enmod rewrite

# 4. Change Apache Document Root to point to Laravel's public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Set working directory
WORKDIR /var/www/html

# 6. Copy application source code
COPY . .

# Run database setup before Apache starts on each deploy/restart.
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 7. Install Composer globally
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 8. Install Laravel project dependencies
RUN composer install --no-interaction --no-scripts --optimize-autoloader --no-dev

# 9. Set permissions for Laravel storage and bootstrap cache directories
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 10. Expose port 80
EXPOSE 80

# 11. Run Apache in the foreground
CMD ["docker-entrypoint.sh"]
