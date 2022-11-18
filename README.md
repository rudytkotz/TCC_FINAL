# TCC

API_Hospital

Inicalmente instalar as dependencias com o seguinte comando

yarn install

Então somente executar o seguinte comando e iniciara a aplicação

yarn develop

Reconhecimento facial

Começando
Buildar a imagem do Docker
Comece criando a imagem docker com um nome definido. Isso pode demorar um pouco.

docker build -t face_servico .


Rodar a imagem do Docker
Inicie a imagem e encaminhe a porta 8080. Opcionalmente, vincule um diretório local a /root/faces para fornecer um local para imagens predefinidas que serão registradas na hora de início

docker run -d -p8080:8080 -v faces:/root/faces face_servico

Totem atendimenro

Inicalmente instalar as dependencias com o seguinte comando

yarn install

Então somente executar o seguinte comando e iniciara a aplicação

yarn run dev