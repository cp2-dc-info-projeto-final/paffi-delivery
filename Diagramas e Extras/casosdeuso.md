# Especificação de casos de uso


## Sumário

- [CDU 01 - Cadastro](#cdu-01---cadastro)
- [CDU 02 - Login](#cdu-02---login)
- [CDU 03 - Atualizar Dados da Loja](#cdu-03---atualizar-dados-da-loja)
- [CDU 04 - Atualizar Perfil](#cdu-04---atualizar-perfil)
- [CDU 05 - Adicionar Produtos](#cdu-05---adicionar-produtos)
- [CDU 06 - Remover Produtos](#cdu-06---remover-produtos)
- [CDU 07 - Acesso ao histórico de compras](#cdu-07---acesso-ao-histórico-de-compras)
- [CDU 08 - Listar Produtos](#cdu-08---listar-produtos)
- [CDU 09 - Confirmar/Cancelar Entrega](#cdu-09---confirmar/cancelar-entrega)


# CDU 01 - Cadastro

**Atores:**  Usuários

**Pré-condições:**  O usuário dever estudar no Colégio Pedro II e possuir número de matrícula

**Fluxo principal:**

1. O usuário deverá fornecer o número de matrícula
2. O usuário deverá inserir o nome
3. O usuário deverá fornecer seu número de celular
4. O usuário deverá indicar qual é a sua turma
5. O usuário deverá criar uma Senha
6. O usuário deverá escolher o tipo de sua conta(vendedor ou cliente)

# CDU 02 - Login

**Atores:**  Usuários

**Pré-condições:** Possuir um cadastro.

**Fluxo principal:**

1. O usuário deverá executar o login informando matrícula e senha.
2. Caso o login seja validado ele será redirecionado para a página correspondente ao tipo da sua conta.

**Fluxo Alternativo**

1. Caso a matrícula ou a senha estejam incorretas uma mensagem será disposta na tela informando que o login não pôde ser executado.


# CDU 03 - Atualizar Dados da Loja

**Atores:**  Vendedor

**Pré-condições:** Estar Cadastrado e logado como vendedor, e estar na página de perfil.

**Fluxo principal:**

1. O Vendedor deverá clicar no botão editar, oque abrirá um formulário com os dados a serem atualizados.
2. O Vendedor deverá escrever nos campos oque quer que seja atualizado e clicar em confirmar.
3. Os campos que ficarem em branco ao confirmar as atualizações serão mantidos como estavam antes.

**Fluxo Alternativo**

1. O Vendedor clica em cancelar e os dados não são alterados.


# CDU 04 - Atualizar Perfil

**Atores:**  Usuários

**Pré-condições:** Estar cadastrado e logado, e estar na página de perfil.

**Fluxo principal:**

1. O usuário deverá clicar em editar perfil, oque abrirá um formulário com os dados a serem atualizados.
2. O usuário deverá escrever nos campos oque quer que seja atualizado e clicar em confirmar.
3. Os campos que ficarem em branco ao confirmar as atualizações serão mantidos como estavam antes.

**Fluxo Alternativo**

1. O Usuário clica em cancelar e os dados não são alterados.

# CDU 05 - Adicionar Produtos

**Atores:**  Vendedor

**Pré-condições:** Estar cadastrado e logado como vendedor, e estar na página de perfil.

**Fluxo principal:**

1. O vendedor deverá clicar em Adicionar Produtos e, no formulário, inserir os dados dos produtos e confirmar.
2. Todos os campos deverão ser preenchidos para o produto ser inserido, caso não sejam dipostos todos os dados, o formulário avisará.


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

**Pré-condições:**  Estar cadastrado e logado como vendedor, estar na página de perfil e ter produtos adicionados.

**Fluxo principal:**

1. O Vendedor deverá clicar em Listar Produtos e uma janela abrirá mostrando os dados dos produtos adicionados por ele.

# CDU 09 - Confirmar/Cancelar entrega

**Atores:**  Vendedor

**Pré-condições:**  Estar cadastrado e logado como vendedor.

**Fluxo principal:**

1. O vendedor, na página do pedido, escolherá o status do pedido(Entregue, A caminho, Cancelado)e confirmará.
2. Após confirmar o produto, o vendedor fará a "nota fiscal", indicando quais produtos foram entregue e sua quantidade.

