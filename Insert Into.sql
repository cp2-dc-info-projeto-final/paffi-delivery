INSERT INTO usuario(email, id_usuario, matricula, nome, photoURL, senha, turma)
VALUES	('julhacp2@gmail.com','1','M02600312','Giulia Fialho Lopes','','julhacpii2','1305')
;
INSERT INTO usuario(email, id_usuario, matricula, nome, photoURL, senha, turma)
VALUES	('sarahferreira252@gmail.com','2','M02100280','Sarah Ferreira Oliveira','','Fer25655','IN301')
;
INSERT INTO usuario(email, id_usuario, matricula, nome, photoURL, senha, turma)
VALUES	('brenasimoes78415@gmail.com','3','M02000783','Brena Alessandra Simões Telles','','brena1812','DS104')
;
INSERT INTO usuario(email, id_usuario, matricula, nome, photoURL, senha, turma)
VALUES	('isabelynhapaulo@gmail.com','4','M02500824','Isabélly da Silva Paulo','','nkd3810ba','1101')
;
INSERT INTO usuario(email, id_usuario, matricula, nome, photoURL, senha, turma)
VALUES	('mariiahangelicah@hotmail.com','5','M02600528 ','Maria Angelica Mauricio da Silva Pereira','','Batatinha19','1201')
;

INSERT INTO loja(id_dono, id_loja, nome_loja, photoURL)
VALUES	('1','1','Giulia_loja','')
;

INSERT INTO loja(id_dono, id_loja, nome_loja, photoURL)
VALUES	('2','2','Sarah_loja','')
;

INSERT INTO loja(id_dono, id_loja, nome_loja, photoURL)
VALUES	('3','3','Brena_loja','')
;
INSERT INTO loja(id_dono, id_loja, nome_loja, photoURL)
VALUES	('4','4','Isabélly_loja ','')
;
INSERT INTO loja(id_dono, id_loja, nome_loja, photoURL)
VALUES	('5','5','Maria_loja','')
;
INSERT INTO produto(categoria, descricao, id_loja, id_produto, nome, photoURL, valor )
VALUES ('Sanduíches','Muito bom','1','1','Sanduba_Guilia','','4');
INSERT INTO produto(categoria, descricao, id_loja, id_produto, nome, photoURL, valor )
VALUES ('Salgados','Muito bom','2','2','Salgados_Sarah','','2');
INSERT INTO produto(categoria, descricao, id_loja, id_produto, nome, photoURL, valor )
VALUES ('Bebidas','Geladinhas','3','3','Bebidas_Brena','','2');
INSERT INTO produto(categoria, descricao, id_loja, id_produto, nome, photoURL, valor )
VALUES ('Doces','Muito boa','4','4','Doces_Isabely','','2');
INSERT INTO produto(categoria, descricao, id_loja, id_produto, nome, photoURL, valor )
VALUES ('Doces','Muito boa','5','5','Maria_Tufas','','2');

INSERT INTO compra(data_compra, hora_compra, id_compra, id_produto, usuario, valor_compra)
VALUES('YYYY/MM/DD','11:50','1','1','Albert','4');
INSERT INTO compra(data_compra, hora_compra, id_compra, id_produto, usuario, valor_compra)
VALUES('YYYY/MM/DD','09:00','2','2','Hugo','2');
INSERT INTO compra(data_compra, hora_compra, id_compra, id_produto, usuario, valor_compra)
VALUES('YYYY/MM/DD','08:30','3','3','Janderson','3');
INSERT INTO compra(data_compra, hora_compra, id_compra, id_produto, usuario, valor_compra)
VALUES('YYYY/MM/DD','10:00','4','4','Fernanda','4');
INSERT INTO compra(data_compra, hora_compra, id_compra, id_produto, usuario, valor_compra)
VALUES('YYYY/MM/DD','09:30','5','5','Theo','2');
