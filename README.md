# NNPIA Semestrální práce - eshop

Jednoduchý eshop vytvořený za účelem získání zápočtu z přemětu NNPIA

## Použité technologie

* Java Spring boot
    *
    
* React
    *
    
* Marian DB

## Technické požadavky
Pro vývoj bylo použito vývojové prostředí IntelliJ IDEA a Xampp. Funkčnost při použití jiných technologií nejde zaručit.

Pro funkčnost aplikace je pro první spuštění přidán script. Tento script vloží data do databáze.
Jsou zde data pro role. Role jsou tyto: uzivatel, správce a administrator. Dále je přidán uživatel
s administrátorskými právy.

Přihlašovací údaje výchozího administratora

* jméno: root
* heslo: root

## Potřebné údaje pro spuštění

Před spuštěním aplikace je potřeba spustit databázi a vytvořit v ní databázi pro eshop.
Dále je potřeba v datbázi nastavit přihlašovací údaje. Tyto údaje a jméno databáze je 
nutno změnit v [application.properties](src/main/resources/application.properties).

Po úspěšném spuštění backendu je potřeba spustit frontend.

Ve složce frontendu [frontend](src/main/frontend) je potřeba spustit tento příkaz:

### `npm start`

Ve vývojovém režimu aplikace poběží na adrese [http://localhost:3000](http://localhost:3000).
Na tuto adresu přejděte ve Svém prohlížeči.

API backendu aplikace je dostupné na adrese [http://localhost:8080](http://localhost:8080).

pokracovani priste a take kontrola

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
