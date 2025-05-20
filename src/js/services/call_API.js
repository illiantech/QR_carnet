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

		const { data } = await axios({
			method: 'GET',
			url: `${root}/historial?cedula=${pathCI}&Nombre=&fecha=&entregado=false&userViews=0`
		})

		if (data.length > 0) {
			const [user] = data[0]

			const { Nombre, cedula, Cargo, Dependencia, fecha } = user;

			let nameParse = Nombre.toLowerCase().trim().split(/\s+/);

			nameParse = nameParse.filter((item, index) => index < 4);

			name.textContent = nameParse.join(' ');

			ci.textContent = `CI: ${cedula}`;

			position.textContent = Cargo.toLowerCase().trim();

			secrTxt.textContent = Dependencia.toLowerCase().trim();

			const mapState = (state) => {
				const states = ['✅ ACTIVO', '❌ INACTIVO', '⚠️ EXTRAVIADO']
				return states[state] || '❌ INACTIVO'
			}

			cardStatus.textContent = mapState(user.estado)
			//direcTxt.textContent = deno_cod_direccion.toLowerCase().trim();

			//dateEntry.textContent = `Ingresado: ${fecha.trim()}`;
		}
		// Peticion del Status del usuario

		axios({
			method: 'GET',
			url: `http://api-carnet.guarico.gob.ve/photo/${pathCI}`,
			responseType: 'blob'
		})
			.then((res) => {
				img.src = URL.createObjectURL(res.data);
			})
			.catch((err) => {
				alert(`Error de conexión: \n La 'foto' del usuario no pudo ser encontrada \n ${err} `);
			});

	} catch (err) {
		position.textContent = 'Esta persona no se encuentra registrada en nuestra base de datos.'
		ci.textContent = pathCI
		name.textContent = '';
		secrTxt.textContent = '-';
		direcTxt.textContent = '-';
		dateEntry.textContent = '-';
		//alert(`Error de conexión: \n Los 'datos' del usuario no pueden ser encontrados \n ${err} `);
	}
};
/* const dataStatus = await axios({
	method: 'GET',
	url: `http://historial-carnets.guarico.gob.ve/historial?cedula=${pathCI}&Nombre=&fecha=&entregado=false&userViews=0`
}).then((res) => {
	console.log(res.data);
	return res.data[0][0];
});
 */


getData();

// Peticion de foto del usuario

