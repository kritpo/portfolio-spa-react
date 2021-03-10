# Portfolio of Jimmy Weng - SPA React Project

Created with the help of `create-react-app`.\
Display the portfolio of Jimmy Weng by fetching data from a server.

## Installation

Clone the application from the GitHub repository:

```sh
git clone https://github.com/kritpo/portfolio-spa-react.git
```

Move to the application folder:

```sh
cd portfolio-spa-react
```

Install dependencies:

```sh
npm install
```

Repeat the dependencies installation in both `amplify\backend\function\portfoliospareactd30404bdPreAuthentication\src` and `amplify\backend\function\portfoliospareactd30404bdPreSignup\src`.

Deploy Amplify Backend:

```sh
amplify push --y
```

You must provide a `.env` file at the root of both `portfoliospareactd30404bdPreAuthentication` and `portfoliospareactd30404bdPreSignup` lambda functions:

```env
# google recaptcha
GOOGLE_RECAPTCHA_SECRET=[YOUR_GOOGLE_RECAPTCHA_SECRET]
```

## Usage

### Configuration

You must provide a `.env` file at the root of the application:

```env
# google recaptcha
REACT_APP_GOOGLE_RECAPTCHA_KEY=[YOUR_GOOGLE_RECAPTCHA_KEY]
```

### Run the application on your computer locally

As the application was created with `create-react-app`, you can run the application locally and also check any updates in live with `react-scripts`, run:

```sh
npm start
```

To see the application, go to [http://localhost:3000](http://localhost:3000) in your browser.

### Build the application

To build the application and generate all necessary files to put on a server, run:

```sh
npm run build
```

The build files will be placed in the `build` folder.
