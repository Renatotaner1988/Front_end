# Front-end do projeto cadastro de clientes

Um projeto simples para ilustrar o front-end utilizando html, css e javascipt
---
## Como executar

Faça o download do projeto e abra o arquivo index.html no seu browser.

# Como executar através do Docker

Certifique-se de ter o Docker instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile no terminal e seus arquivos de aplicação e Execute como administrador o seguinte comando para construir a imagem Docker:

```
docker build -t nome_da_sua_imagem .
````

Uma vez criada a imagem, para executar o container basta executar, como administrador, seguinte o comando:
```
docker run -d -p 8080:80 nome_da_sua_imagem
```