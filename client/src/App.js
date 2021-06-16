import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Footer from './components/layout/Footer';
import PageNotFound from './components/pages/PageNotFound';
import ScrollToTop from './components/layout/ScrollToTop';
import FloatingActionButton from './components/layout/FloatingActionButton';
import Cart from './components/pages/Cart';
import Contact from './components/pages/Contact';
import Products from './components/pages/Product-Pages/Products';
import ProductCategory from './components/pages/Product-Pages/ProductCategory';
import ProductView from './components/pages/Product-Pages/ProductView';
import About from './components/pages/About-Pages/About';
import AdminLogin from './components/pages/Admin-Pages/AdminLogin';
import AdminVerifyAccount from './components/pages/Admin-Pages/AdminVerifyAccount';
import AdminDashboard from './components/pages/Admin-Pages/AdminDashboard';
import AdminViewProducts from './components/pages/Admin-Pages/Admin-Product-Pages/AdminViewProducts';
import AdminAddProduct from './components/pages/Admin-Pages/Admin-Product-Pages/AdminAddProduct';
import AdminEditProduct from './components/pages/Admin-Pages/Admin-Product-Pages/AdminEditProduct';
import React from 'react';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { IconButton, Snackbar } from '@material-ui/core';
import AppContext from './utils/AppContext';

const useStyles = makeStyles({
	root: {
		fontFamily: 'Calibri',
		fontWeight: 'normal',
		color: '#000000',
		backgroundColor: '#FFFFFF',
	},
});

function App() {
	const classes = useStyles();
	const [contextVariables, setContextVariables] = React.useState({
		// loggedInStatus: sessionDetails ? true : false,
		feedback: {
			open: false,
			message: '',
			type: 'info',
		},
	});

	const toggleSnackbar = () =>
		setContextVariables({
			...contextVariables,
			feedback: {
				...contextVariables.feedback,
				open: !contextVariables.feedback.open,
			},
		});
	return (
		<AppContext.Provider value={{ contextVariables, setContextVariables }}>
			<div className={classes.root}>
				<BrowserRouter>
					<ScrollToTop />
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						autoHideDuration={5000}
						open={contextVariables.feedback.open}
						onClose={toggleSnackbar}
						action={
							<IconButton
								size='small'
								aria-label='close'
								color='inherit'
								onClick={toggleSnackbar}
							>
								<Close fontSize='small' />
							</IconButton>
						}
					>
						<Alert
							onClose={toggleSnackbar}
							severity={contextVariables.feedback.type}
							variant='filled'
						>
							{contextVariables.feedback.message}
						</Alert>
					</Snackbar>
					<Switch>
						<Route path='/' component={Homepage} exact />
						<Route path='/cart' component={Cart} exact />
						<Route path='/about' component={About} exact />
						<Route path='/contact' component={Contact} exact />
						<Route path='/products' component={Products} exact />
						<Route path='/product/view/:productID' exact component={ProductView} />
						<Route
							path='/products/category/:category'
							component={ProductCategory}
							exact
						/>

						{/* Admin Routes */}
						<Route path='/admin/login' component={AdminLogin} exact />
						<Route path='/admin/verify' component={AdminVerifyAccount} exact />
						<Route path='/admin/dashboard' component={AdminDashboard} exact />
						<Route path='/admin/products' component={AdminViewProducts} exact />
						<Route path='/admin/products/new' component={AdminAddProduct} exact />
						<Route
							path='/admin/products/edit/:productID'
							component={AdminEditProduct}
							exact
						/>

						{/* 404 Route */}
						<Route path='*' component={PageNotFound} />
					</Switch>
					<FloatingActionButton />
					<Footer />
				</BrowserRouter>
			</div>
		</AppContext.Provider>
	);
}

export default App;
