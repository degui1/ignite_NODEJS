# Requisitos
 **RF**:  Requisitos Funcionais
 **RNF**: Requisitos Não Funcionais
 **RN**:  Regra de negócio


# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, como disponível.
Apenas usuários administradores pode cadastrar um novo carro.

# Listar carros

**RF**
Deve ser possível listar apenas os carros disponíveis.
Deve ser possível listar todos os carros disponível pelo nome da categoria.
Deve ser possível listar todos os carros disponível pelo nome do carro.
Deve ser possível listar todos os carros disponível pelo nome da marca.

**RN**
Não é necessário está logado no sistema para listar os carros cadastrados.

# Cadastro de especificações no carro

**RF**
Deve ser possível cadastrar uma ou mais especificações para um carro.
Deve ser possível listar todas as especificações.
Apenas usuários administradores pode cadastrar uma nova especificação.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar especificações com nomes duplicados para um mesmo carro.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário pode cadastrar mais de uma imagem para o mesmo carro.
Apenas usuários administradores pode cadastrar as imagens.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração mínima de 24 hora.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.