// Axios v1.0.0
import axios from 'axios';

// función para simplificar clasificación de elementos

const $ = (selector) => document.querySelector(selector);

// elementos del index.html

const name = $('.card--name');

const img = $('.card--img');

const ci = $('.card--ci');

const position = $('.card--position');

const secrTxt = $('.card--secretary-paragraph');

const direcTxt = $('.card--direction-paragraph');

const dateEntry = $('.card--date-entry');

const status = ['Activo', 'Inactivo', 'Extraviado'];

const cardStatus = $('.card--status');

// tomando dato desde url

const pathCI = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);

const getData = async () => {
	try {
		// Peticion de datos del usuario

		const data = await axios({
			method: 'GET',
			url: `http://api-carnet.guarico.gob.ve/client/${pathCI}`
		}).then((res) => {
			console.log(res.data);
			return res.data;
		});

		const { nombre, cedula_identidad, demonimacion_puesto, deno_cod_secretaria, deno_cod_direccion, fecha_ingreso } = data;

		let nameParse = nombre.toLowerCase().trim().split(/\s+/);

		nameParse = nameParse.filter((item, index) => index < 4);

		name.textContent = nameParse.join(' ');

		ci.textContent = `CI: ${cedula_identidad}`;

		position.textContent = demonimacion_puesto.toLowerCase().trim();

		secrTxt.textContent = deno_cod_secretaria.toLowerCase().trim();

		direcTxt.textContent = deno_cod_direccion.toLowerCase().trim();

		dateEntry.textContent = `Ingresado: ${fecha_ingreso.trim()}`;

		// Peticion del Status del usuario

		const dataStatus = await axios({
			method: 'GET',
			url: `http://historial-carnets.guarico.gob.ve/historial?cedula=${pathCI}&Nombre=&fecha=&entregado=false&userViews=0`
		}).then((res) => {
			console.log(res.data);
			return res.data[0][0];
		});

		cardStatus.textContent = status[dataStatus.estado];
	} catch (err) {
		alert(`Error de conexión: \n Los 'datos' del usuario no pueden ser encontrados \n ${err} `);
	}
};

getData();

// Peticion de foto del usuario

axios({
	method: 'GET',
	url: `http://api-carnet.guarico.gob.ve/photo/${pathCI}`,
	responseType: 'blob'
})
	.then((res) => {
		console.log(res);

		img.src = URL.createObjectURL(res.data);
	})
	.catch((err) => {
		alert(`Error de conexión: \n La 'foto' del usuario no pudo ser encontrada \n ${err} `);
	});
