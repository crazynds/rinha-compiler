FROM ubuntu:23.10

RUN apt update
RUN apt install -y curl pkg-config libssl-dev clang build-essential

RUN apt install -y nodejs npm cmake git

RUN apt install -y wget

# Get Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN rustup install stable && rustup default stable
RUN rustup target add wasm32-wasi

# Install Javy
RUN wget https://github.com/bytecodealliance/javy/releases/download/v1.1.2/javy-x86_64-linux-v1.1.2.gz
RUN gzip -d javy-x86_64-linux-v1.1.2.gz
RUN mv javy-x86_64-linux-v1.1.2 javy
RUN chmod +x javy
RUN mv javy /usr/bin/javy


# Install wasm engine
RUN curl https://wasmtime.dev/install.sh -sSf | bash


ENTRYPOINT [ "tail","-f","/dev/null"]
