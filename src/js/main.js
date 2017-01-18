	$(function(){
		login();
		// $('.btn-enviar-valor').click(function() {

		// });

		// $('#recuperarSaldo').click(function(){
		// 	Saldo();
		// });

		// $('#gerarDebito').click(function(){
		// 	adicionaNovoExtrato();
		// });
	});


	var idUsuario;
	var saldoAtual;

	//idUsuario = '3cBXwAZaiMe6S4xY4Xg9L80R4MQ2'; 

	var config = {
		apiKey: "AIzaSyCCk8rCPRokRRjuYA07SSdIWADr2bAyFqU",
		authDomain: "bankbox-63f33.firebaseapp.com",
		databaseURL: "https://bankbox-63f33.firebaseio.com",
		storageBucket: "bankbox-63f33.appspot.com",
		messagingSenderId: "534967674886"
	};
	firebase.initializeApp(config);

	var provider = new firebase.auth.GoogleAuthProvider();

	function login() {
		firebase.auth().signInWithPopup(provider).then(function(result) {
			var token = result.credential.accessToken;
			var user = result.user;
			email = result.user.email;
			nome = result.user.displayName;

			idUsuario = user.uid;

			//console.log(idUsuario);

			Saldo();	
		}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			});
		
	}

	function adicionaNovoUsuario() {
		var usuario = {
			email: email,
			lastAcess: '14 de Jan de 2017 - 14:00',
			saldo: '1005,50',
			username: nome
		};

		var updates = {};
		updates['/users/'+idUsuario] = usuario;

		return firebase.database().ref().update(updates);
	}

	function adicionaNovoExtrato() {

		// var tipo = $("#txtTipo").val();
		// var valor = ($("#txtValor").val()).replace(",",".");
		// var valorSaldo = ($("#saldoValor").html()).replace(",",".");

		var tipo = 'Cantina - Colegio Bandeirantes';
		var valor = 50.00;
		var valorSaldo = saldoAtual.replace(",",".");

		firebase.database().ref('extrato/' + idUsuario).push().set({
			imgCategoria : 2130837588,
			status: 0,
			tipo: tipo,
			valor: ("R$" + valor + ',00')
		});

		valorSaldo = valorSaldo -  valor;
		console.log('Valor do debito: ' + valor);
		console.log('Saldo sem debito: ' + saldoAtual);

		console.log('Saldo com debito: ' + valorSaldo);
		// console.log (valorSaldo);
		if ((''+valorSaldo).indexOf(".") != -1){ 
			valorSaldo = (valorSaldo.toString()).replace(".",",");
		}else{
			console.log('else do .');
			valorSaldo = valorSaldo.toString();
		}
			
		var usuario = {
			email: 'dev.bankbox@gmail.com',
			lastAcess: '14 de Jan de 2017 - 14:00',
			saldo: '' + valorSaldo + ',00',
			username: 'Account Bankbox Developer'
		};

		var updates = {};
		updates['/users/'+idUsuario] = usuario;

		firebase.database().ref().update(updates);

		$(location).attr('href','obrigado.html');
	}

	function Saldo() {
		// console.log(idUsuario);
		var userSaldo = firebase.database().ref('users/' + idUsuario);
		userSaldo.on('value', function(opcoes) {
			//$("#saldoValor").html(opcoes.val()["saldo"]);
			// console.log(opcoes.val()["saldo"]);
			saldoAtual = opcoes.val()["saldo"];
			console.log('Saldo retornado pela API: ' + opcoes.val()["saldo"]);

		});
	}