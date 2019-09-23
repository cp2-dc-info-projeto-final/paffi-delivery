# Especificação de casos de uso


## Sumário

- [CDU 01 - Cadastro](#cdu-01---cadastro)
- [CDU 02 - Login](#cdu-02---login)
- [CDU 03 - Atualizar Dados da Loja](#cdu-03---atualizar-dados-da-loja)
- [CDU 04 - Adicionar Produtos](#cdu-04---adicionar-produtos)
- [CDU 05 - Atualizar Perfil](#cdu-05---atualizar-perfil)
- [CDU 06 - Remover Produtos](#cdu-06---remover-produtos)
- [CDU 07 - Acesso ao histórico de compras](#cdu-07---acesso-ao-histórico-de-compras)
- [CDU 08 - Listar Produtos](#cdu-08---listar-produtos)
- [CDU 09 - Confirmar/Cancelar Entrega](#cdu-09---confirmar/cancelar-entrega)


# CDU 01 - Cadastro

**Atores:**  Usuários

**Pré-condições:**  O usuário dever estudar ou trabalhar no Colégio Pedro II

**Fluxo principal:**

1. O usuário deverá inserir o Nome.
2. O usuário deverá inserir o Sobrenome.
3. O usuário deverá inserir o E-mail.
4. O usuário deverá criar uma Senha.
5. O usuário deverá dizer se é vendedor ou não.

**Fluxo Alternativo**

1. Caso o usuário seja vendedor, ele poderá inserir também, na ocasião do cadastro, o nome de sua loja.

# CDU 02 - Login

**Atores:**  Usuários

**Pré-condições:** Possuir um cadastro.

**Fluxo principal:**

1. O usuário deverá executar o login informando e-mail e senha.
2. Caso o login seja validado ele será redirecionado para a página de lojas, tendo opções diferentes de navegação caso seja vendedor

**Fluxo Alternativo**

1. Caso o email ou a senha estejam incorretas uma mensagem será disposta na tela informando que o login não pôde ser executado.


# CDU 03 - Atualizar Dados da Loja

**Atores:**  Vendedor

**Pré-condições:** Estar Cadastrado e logado como vendedor, e estar na página "Minha Loja".

**Fluxo principal:**

1. O Vendedor deverá clicar no botão editar, que transformará a página em campos editáveis, para editar os valores
2. O Vendedor deverá escrever nos campos oque quer que seja atualizado e clicar em confirmar.
3. Os campos que não forem alterados antes de confirmar as atualizações serão mantidos como estavam antes.

**Fluxo Alternativo**

1. O Vendedor clica em cancelar e os dados não são alterados.

# CDU 04 - Adicionar Produtos

**Atores:**  Vendedor

**Pré-condições:** Estar cadastrado e logado como vendedor, e estar na página de perfil.

**Fluxo principal:**

1. O vendedor deverá clicar em Adicionar Produtos e, no formulário, inserir os dados dos produtos e confirmar.
2. Todos os campos deverão ser preenchidos para o produto ser inserido, caso não sejam dipostos todos os dados, o formulário avisará.

# CDU 05 - Atualizar Perfil

**Atores:**  Usuários

**Pré-condições:** Estar cadastrado e logado, e estar na página de perfil.

**Fluxo principal:**

1. O usuário deverá clicar em editar perfil, oque abrirá um formulário com os dados a serem atualizados.
2. O usuário deverá escrever nos campos oque quer que seja atualizado e clicar em confirmar.
3. Os campos que ficarem em branco ao confirmar as atualizações serão mantidos como estavam antes.

**Fluxo Alternativo**

1. O Usuário clica em cancelar e os dados não são alterados.

# CDU 06 - Remover Produtos

**Atores:**  Vendedor

**Pré-condições:** Estar cadastrado e logado como vendedor, estar na página de perfil e ter produtos.

**Fluxo principal:**

1. O vendedor deverá clicar em Remover Produtos e identificar o produto a ser removido.
2. Ele deverá clicar em confirmar, oque abrirá uma janela de aviso, que ele deverá clicar em confirmar novamente para remover o produto.

# CDU 07 - Acesso ao histórico de Compras

**Atores:**  Cliente

**Pré-condições:**  O cliente deverá estar cadastrado e logado, estar em seu perfil e ter realizado algum pedido.

**Fluxo principal:**

1. O usuário deverá clicar em Mostrar histórico, e ele será redirecionado a página mostrando seu histórico.


# CDU 08 - Listar Produtos

**Atores:**  Vendedor

**Pré-condições:**  Estar cadastrado e logado como vendedor, estar na página "Minha Loja" e ter produtos adicionados.

**Fluxo principal:**

1. O Vendedor deverá entrar em sua loja e descer a página, aonde verá uma tabela com as informações dos produtos, e um campo, que ao passar o mouse em cima, mostrará a foto do produto

# CDU 09 - Confirmar/Cancelar entrega

**Atores:**  Vendedor

**Pré-condições:**  Estar cadastrado e logado como vendedor.

**Fluxo principal:**

1. O vendedor, na página do pedido, escolherá o status do pedido(Entregue, A caminho, Cancelado)e confirmará.
2. Após confirmar o produto, o vendedor fará a "nota fiscal", indicando quais produtos foram entregue e sua quantidade.

