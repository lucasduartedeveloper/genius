FROM php:8.0-apache
# FROM nginx-php-fpm:1.9.1

COPY genius /var/www/apps/genius

ENV WEBROOT /var/www/apps/genius
WORKDIR /var/www/apps/genius

ENV APACHE_DOCUMENT_ROOT=/var/www/apps/genius
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/conf-available/*.conf

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y