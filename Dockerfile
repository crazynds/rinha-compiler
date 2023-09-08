FROM ubuntu:23.10

WORKDIR /app

VOLUME [ "./:/app" ]

RUN apt update
RUN apt install -y curl pkg-config libssl-dev clang build-essential

RUN apt install -y nodejs npm cmake git

RUN apt install -y wget

RUN npm install 


ENTRYPOINT [ "tail","-f","/dev/null"]
