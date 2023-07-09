FROM php:8.0-apache

# ENV WEBROOT /var/www/html/public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# WORKDIR /var/www/html/public

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y