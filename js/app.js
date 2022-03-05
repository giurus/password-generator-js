(function() {
	var app = document.getElementById('app');
	var nrocharacters = document.getElementById('characters');
	var alert = document.getElementById('alert-copied');
	/* --------------------------------------------- */
	/* Variables generales */
	/* --------------------------------------------- */

	var config = {
		characters: parseInt(nrocharacters.value),
		simbols: true,
		number: true,
		mayus: true,
		minus: true
	};

	var characters = {
		number: '0 1 2 3 4 5 6 7 8 9',
		simbols: '! # $ % & ( ) * + , - . / : ; < = > ? @ [ ] ^ _ { | } ~',
		minus: 'a b c d e f g h i j k l m n ñ o p q r s t u v w x y z',
		mayus: 'A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z'
	};

	/* --------------------------------------------- */
	/* Eventos */
	/* --------------------------------------------- */

	app.addEventListener('submit', function(e) {
		e.preventDefault(); //Esto evita el comportamiento por defecto del submit al carga
	});

	app.elements.namedItem('btn-minus').addEventListener('click', function() {
		if (config.characters > 3) {
			config.characters--;
			nrocharacters.value = config.characters;
		}
	});

	app.elements.namedItem('btn-plus').addEventListener('click', function() {
		if (config.characters < 200) {
			config.characters++;
			nrocharacters.value = config.characters;
		}
	});

	app.elements
		.namedItem('input-password')
		.addEventListener('click', function() {
			copy();
		});
	// app.elements.namedItem('btn-simbols').addEventListener('click', function() {
	// 	this.classList.toggle('false'); //El toggle alterna entre uno y otro - false y true en nuestro codigo quitar o poner la clase false
	// 	this.childNodes[1].classList.toggle('fa-check');
	// 	this.childNodes[1].classList.toggle('fa-times');
	// });

	var botons = ['btn-simbols', 'btn-numbers', 'btn-mayus'];
	for (let i = 0; i < botons.length; i++) {
		app.elements.namedItem(botons[i]).addEventListener('click', function() {
			btnToggle(this);
			switch (botons[i]) {
				case 'btn-simbols':
					config.simbols = !config.simbols;
					break;
				case 'btn-numbers':
					config.number = !config.number;
					break;
				case 'btn-mayus':
					config.mayus = !config.mayus;
					break;
			}
		});
	}

	app.elements.namedItem('btn-generar').addEventListener('click', function() {
		generarPassword();
	});

	/* --------------------------------------------- */
	/* Funciones */
	/* --------------------------------------------- */

	function btnToggle(element) {
		element.classList.toggle('false'); //El toggle alterna entre uno y otro - false y true en nuestro codigo quitar o poner la clase false
		element.childNodes[1].classList.toggle('fa-check');
		element.childNodes[1].classList.toggle('fa-times');
	}

	function generarPassword() {
		var passwordFinal = '';
		var password = '';
		for (properties in config) {
			//Iteramos la config por la cantidad de propiedades que tenemos ver linea 8
			if (config[properties] === true) {
				//Si es verdadero ejecutamos characters con su propiedad respectiva si es true se registra en la variable passwordFinal
				passwordFinal += characters[properties] + ' ';
			}
		}

		passwordFinal = passwordFinal.trim(); //Quita espaciado al comienzo y final
		passwordFinal = passwordFinal.split(' '); //Separa cada elemento del string en un array

		for (let i = 0; i < config.characters; i++) {
			password +=
				passwordFinal[Math.floor(Math.random() * passwordFinal.length)]; //El math.floor hacer un numero quede redondeado, math.random no devuelve un numero al azar del 0 al 1 y lo multiplicamos por la cantidad de letras que tenemos guardado en nuestro passwordFinal. Linea 95
		}
		app.elements.namedItem('input-password').value = password;
	}

	function copy() {
		app.elements.namedItem('input-password').select(); //seleccionamos lo que este en el input password
		document.execCommand('copy'); //Del documento lo que este seleccionado ejecutamos el comando copiar
		alert.classList.add('active'); //Agregamos la clase active que esta en nuestro css - la variable alert esta en la linea 4
		setTimeout(function() {
			//SetTimeout hace que se ejecute una funcion despues de cierto tiempo al final puse 2500 -> 2.5 segundos
			alert.classList.remove('active'); //Aqui remueve la clase active
		}, 2500);
	}

	generarPassword();
})();
