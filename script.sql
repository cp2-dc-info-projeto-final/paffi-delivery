CREATE DATABASE Paffi ;

CREATE TABLE usuario (
id_usuario INT AUTO-INCREMENT, 
matricula VARCHAR (10),
email VARCHAR (50),
nome VARCHAR (40),
senha VARCHAR (30),
turma VARCHAR (10),
PRIMARY KEY (id_usuario) 
);
 
CREATE TABLE loja (
id_loja INT,
id_dono INT,
PRIMARY KEY (id_loja),
FOREIGN KEY (id_dono) REFERENCES usuario(id_usuario)
);

CREATE TABLE produto (
id_produto INT,
nome VARCHAR(40),
descricao VARCHAR(40),
categoria VARCHAR(40),
valor FLOAT,
id_loja INT,
PRIMARY KEY (id_produto),
FOREIGN KEY (id_loja) REFERENCES loja (id_loja)
);

CREATE TABLE compra (
id_compra INT,
valor_compra DECIMAL (5,2),
data_compra DATE,
hora_compra TIME,
matricula INT,
id_produto INT,
PRIMARY KEY (id_compra),
FOREIGN KEY(matricula) REFERENCES usuario(id_usuario),
FOREIGN KEY(id_produto) REFERENCES produto(id_produto)
);

CREATE TABLE compra_produto(
id_produto INT,
id_compra INT,
quant INT,
PRIMARY KEY (quant),
FOREIGN KEY (id_produto) REFERENCES produto (id_produto),
FOREIGN KEY (id_compra) REFERENCES compra (id_compra)
);

