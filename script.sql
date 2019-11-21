CREATE DATABASE Paffi ;

USE Paffi;

CREATE TABLE usuario (
id_usuario VARCHAR(30), 
matricula VARCHAR (10),
email VARCHAR (255),
nome VARCHAR (255),
photoURL VARCHAR(255),
senha VARCHAR (30),
turma VARCHAR (10),
PRIMARY KEY (id_usuario) 
);
 
CREATE TABLE loja (
nome_loja VARCHAR(255),
photoURL VARCHAR(255),
descricao TEXT,
id_loja INT AUTO_INCREMENT,
id_dono VARCHAR(30),
online boolean,
PRIMARY KEY (id_loja),
FOREIGN KEY (id_dono) REFERENCES usuario(id_usuario)
);

CREATE TABLE produto (
id_produto INT AUTO_INCREMENT,
nome VARCHAR(40),
photoURL VARCHAR(255),
descricao VARCHAR(255),
categoria VARCHAR(40),
valor FLOAT,
id_loja INT,
PRIMARY KEY (id_produto),
FOREIGN KEY (id_loja) REFERENCES loja (id_loja)
);

CREATE TABLE compra (
id_compra INT AUTO_INCREMENT,
valor_compra INT,
data_compra varchar(10),
hora_compra varchar(10),
id_usuario varchar(30),
id_loja int,
finalizada boolean,
local varchar(55),
PRIMARY KEY (id_compra),
FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario),
FOREIGN KEY(id_loja) REFERENCES loja(id_loja)
);

CREATE TABLE compra_produto(
id_produto INT,
id_compra INT,
FOREIGN KEY (id_produto) REFERENCES produto (id_produto),
FOREIGN KEY (id_compra) REFERENCES compra (id_compra)
);
