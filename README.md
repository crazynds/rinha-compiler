# Compilador para o Rinha Compiler


A ideia que pensei foi utilizar as ferramentas dos compiladores modernos para fazer o trabalho sujo pra mim.

Meu compilador traduz a arvore de execução em um arquivo JS, e depois é ele executa usando NodeJS. Bem simples.

## Futuro

A ideia é depois fazer ele gerar um arquivo C++ e rodar usando código de máquina. 🥳🥳🥳🥳


## Modo de uso

O Dockerfile já seta todo o ambiente necessário. 

Para compilar a arvore no arquivo final, use o comando abaixo:
```bash
node compiler.js input.json -o output.js
```
No qual ```input.json``` é a arvore de entrada, e o ```output.js``` é o arquivo de saida.

É possivel passar mais de um arquivo como entrada, ele juntar todas as saidas em apenas um arquivo .js.

Para rodar o arquivo gerado use o comando abaixo.
```bash
node output.js
```

