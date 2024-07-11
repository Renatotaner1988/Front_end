# Use a imagem base do Nginx
FROM nginx:alpine

# Copie os arquivos do projeto para o diretório de Nginx
COPY . /usr/share/nginx/html

# Exponha a porta que o Nginx usará
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]