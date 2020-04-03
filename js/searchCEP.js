
function abc() {
  let deliveryType = document.getElementById('nCdServico');
  var strUser = deliveryType.options[deliveryType.selectedIndex].value;
  console.log(strUser)

  // let sCepOrigem = String(document.querySelector('#sCepOrigem').value);
  // let sCepDestino = String(document.querySelector('#sCepDestino').value);
  // let nVlPeso = String(document.querySelector('#nVlPeso').value);
  // let nVlComprimento = String(document.querySelector('#nVlComprimento').value);
  // let nVlLargura = String(document.querySelector('#nVlLargura').value);
  // let nVlAltura = document.querySelector('#nVlAltura').value;
  // let nVlValorDeclarado = document.querySelector('#nVlValorDeclarado').value;

  console.log(sCepOrigem)
  var nCdEmpresa = ''
  var sDsSenha =  ''
  var sCepOrigem =  '13820000'
  var sCepDestino = '13061155'
  var nVlPeso = '5'
  var nCdFormato = '1'
  var nVlComprimento = '16'
  var nVlAltura = '5'
  var nVlLargura = '15'
  var nVlDiametro= '0'
  var sCdMaoPropria= 's'
  var nVlValorDeclarado= '200'
  var sCdAvisoRecebimento= 'n'
  var StrRetorno = 'xml'
  var nCdServico = '40010'
    
  
  var url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=' + nCdEmpresa + '&sDsSenha=' + sDsSenha + '&nCdServico=' + strUser + '&sCepOrigem=' + sCepOrigem + '&sCepDestino=' + sCepDestino + '&nVlPeso=' + nVlPeso + '&nCdFormato=' + nCdFormato + '&nVlComprimento=' + nVlComprimento + '&nVlAltura=' + nVlAltura + '&nVlLargura=' + nVlLargura + '&nVlDiametro=' + nVlDiametro + '&sCdMaoPropria=' + sCdMaoPropria + '&nVlValorDeclarado=' + nVlValorDeclarado + '&sCdAvisoRecebimento=' + sCdAvisoRecebimento + '&StrRetorno=' + StrRetorno;

  let request = new XMLHttpRequest();
  request.open('GET', url);
  console.log(request)
  request.onload = function () {
    var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(request.response ,"text/xml");
    var finalValue = xmlDoc.getElementsByTagName("ValorSemAdicionais")[0].childNodes[0];

    var finalPeriod = xmlDoc.getElementsByTagName("PrazoEntrega")[0].childNodes[0];
    for(item in finalValue) {
      console.log(String(finalValue).toString());
      
    }
    console.log(finalValue);
    console.log(finalPeriod);
    console.log(JSON.stringify(request.response));

    let value = document.getElementById('ValorSemAdicionais').appendChild(finalValue); ;

    let period = document.getElementById('PrazoEntrega').appendChild(finalPeriod); ;
    period.innerHTML = finalPeriod;
  }
  request.send()

}

function quest(value) {
  if(value == 'Não') {
    let checkButtons = document.getElementById('checkButtons');
    checkButtons.style.display = 'None'
  }
  else {
    let deliveryValues = document.getElementById('deliveryValues');
    deliveryValues.style.display = 'block'
    let checkButtons = document.getElementById('checkButtons');
    checkButtons.style.display = 'None'
  }
}

let btnCEP = document.querySelector('button');

//Obtendo a ação realização no click do botão
btnCEP.addEventListener('click', function () {

  let cep = document.querySelector('#cep').value;

  var addressTable = document.getElementById('addressTable');
  addressTable.style.display = 'block';

  var questButtons = document.getElementById('checkButtons').style.display = 'block';

  let api = `https://viacep.com.br/ws/${cep}/json/`;
  let request = new XMLHttpRequest();
  request.open('GET', api);

  request.onload = function () {
    console.dir(JSON.parse(request.responseText));
    console.log(JSON.parse(request.responseText).logradouro);
    console.log(JSON.parse(request.responseText).bairro)

    //Transforma o JSON retornado em um objeto do JavaScript
    let address = JSON.parse(request.responseText);

    //Pega o objeto retorno e adiciona na DIV do HTML
    let street = document.querySelector('#street');
    street.innerHTML = address.logradouro;

    let district = document.querySelector('#district');
    district.innerHTML = address.bairro;

    let uf = document.querySelector('#uf');
    uf.innerHTML = address.uf;

    let city = document.querySelector('#city');
    city.innerHTML = address.localidade;
  }

  //console.log(cep);
  request.send();

});