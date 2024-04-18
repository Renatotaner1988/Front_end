/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      var tabela = document.getElementById('lista-clientes');
      tabela.innerHTML = "";
      data.clientes.forEach(item => insertList(item.id, item.nome, item.email, item.tel))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputClient, inputEmail, inputTel) => {
  const formData = new FormData();
  formData.append('nome', inputClient);
  formData.append('email', inputEmail);
  formData.append('tel', inputTel);

  let url = 'http://127.0.0.1:5000/cliente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      insertList(data.id,data.nome, data.email, data.tel);
      alert("Cliente inserido!");
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let btnEditar = document.createElement("button");
  btnEditar.innerHTML="Editar";
  btnEditar.className="btn btn-primary btn-sm"
  btnEditar.onclick = function () 
  {
    editar(this);
  }

  parent.appendChild(btnEditar);

  let btnExcluir = document.createElement("button");
  btnExcluir.innerHTML="Excluir";
  btnExcluir.className="btn btn-danger btn-sm"
  btnExcluir.onclick = function () 
  {
    removeElement(event, this);
  }

  parent.appendChild(btnExcluir);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = (evento,item) => {
  
  let div = item.parentElement.parentElement;
  let id = div.getElementsByTagName('td')[0].innerHTML
  let nome = div.getElementsByTagName('td')[1].innerHTML
  if (confirm("Tem certeza que deseja excluir?\n" + id + " - " + nome )) {
    div.remove()
    deleteItem(id)
    alert("Removido!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/cliente?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

function salvar()
{
  let inputId = document.getElementById("txt_id").value;
  let inputNome = document.getElementById("txt_nome").value;
  let inputEmail = document.getElementById("txt_email").value;
  let inputTel= document.getElementById("txt_telefone").value;

  if (inputNome === '') {
    alert("Escreva o Nome do cliente!");
  } else if (inputEmail === '') {
    alert("Escreva o Email do cliente!");
  } else if (inputTel === '') {
    alert("Escreva o Telefone do cliente!");
  } else {
    if(inputId == "")
    {
      postItem(inputNome, inputEmail, inputTel)
    }
    else
    {
      putItem(inputId, inputNome, inputEmail, inputTel)
    }
  }
}

const putItem = async (id, nome, email, telefone) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('tel', telefone);

  let url = 'http://127.0.0.1:5000/cliente';
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Cliente atualizado!")
      getList();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, nameClient, Email, Tel) => {
  var item = [id,nameClient, Email, Tel]
  var table = document.getElementById('lista-clientes');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("txt_id").value = "";
  document.getElementById("txt_nome").value = "";
  document.getElementById("txt_email").value = "";
  document.getElementById("txt_telefone").value = "";

}


function novo()
{
    if(document.getElementById("txt_nome").value != null && document.getElementById("txt_email").value != "")
    {
        var confirma = confirm("Existem dados não salvos. \nDeseja continuar?");
        if(!confirma)
        {
            return;
        }
    }

    document.getElementById("txt_nome").value = "";
    document.getElementById("txt_email").value = "";
    document.getElementById("txt_telefone").value = "";
    document.getElementById("txt_nome").focus();
}

function editar(item)
{
  let div = item.parentElement.parentElement;
  let id = div.getElementsByTagName('td')[0].innerHTML
  let nome = div.getElementsByTagName('td')[1].innerHTML
  let email = div.getElementsByTagName('td')[2].innerHTML
  let telefone = div.getElementsByTagName('td')[3].innerHTML

  document.getElementById("txt_id").value = id;
  document.getElementById("txt_nome").value = nome;
  document.getElementById("txt_email").value = email;
  document.getElementById("txt_telefone").value = telefone;
}