FROM httpd:2.4-alpine

MAINTAINER Stelio Moiane <steliomo@gmail.com>

ADD httpd.conf /usr/local/apache2/conf/httpd.conf

ADD httpd-vhosts.conf /usr/local/apache2/conf/httpd-vhosts.conf

# ADD mentoring-web.zip /usr/local/apache2/htdocs/

# RUN apk add --update unzip

# RUN unzip /usr/local/apache2/htdocs/mentoring-web.zip -d /usr/local/apache2/htdocs/

# RUN rm -f /usr/local/apache2/htdocs/mentoring-web.zip