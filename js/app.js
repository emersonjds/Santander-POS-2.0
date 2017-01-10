$(document).ready(function() {
	$('.btn-confirmar').click(function() {
		$(location).attr('href' , 'telaPagamento.html');
	});

	$('.cancelar').click(function() {
		$(location).attr('href', 'index.html');
	});

	$('.pagar').click(function() {
		$(location).attr('href', 'qrcode.html');
	});

	$('.imagem-qrcode').click(function() {
		$(location).attr('href', 'confirmaPagamento.html');
	});

});