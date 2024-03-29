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
import PrivateRoute from './utils/Routes/PrivateRoute';
import PublicRoute from './utils/Routes/PublicRoute';
import NewProducts from './components/pages/Product-Pages/NewProducts';
import TrendingProducts from './components/pages/Product-Pages/TrendingProducts';
import AdminProductDescription from './components/pages/Admin-Pages/Admin-Product-Pages/AdminProductDescription';
import AdminChangePassword from './components/pages/Admin-Pages/AdminChangePassword';
import ViewAdmins from './components/pages/Admin-Pages/ViewAdmins';
import NewAdmin from './components/pages/Admin-Pages/NewAdmin';
import OrderPage from './components/pages/Order-Pages/OrderPage';
import OrderSuccessful from './components/pages/Order-Pages/OrderSuccessful';
import MetaTags from './utils/MetaTags';
import AdminViewOrders from './components/pages/Admin-Pages/Admin-Orders/AdminViewOrders';
import AdminViewOrderReference from './components/pages/Admin-Pages/Admin-Orders/AdminViewOrderReference';
import AdminViewProductCategories from './components/pages/Admin-Pages/Admin-Product-Categories/AdminViewProductCategories';
import AdminNewProductCategory from './components/pages/Admin-Pages/Admin-Product-Categories/AdminNewProductCategory';
import AdminEditProductCategory from './components/pages/Admin-Pages/Admin-Product-Categories/AdminEditProductCategory';

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
	let storedSession = localStorage.getItem('sessionDetails_glowStopper');

	const [contextVariables, setContextVariables] = React.useState({
		loggedInStatus: storedSession ? true : false,
		feedback: {
			open: false,
			message: '',
			type: 'info',
		},
		cartItems: [],
	});

	React.useEffect(() => {
		const getCartDetails = () => {
			const cartItems = JSON.parse(localStorage.getItem('cart_glowStopper'));
			const cartTimeout = JSON.parse(
				localStorage.getItem('cart_glowStopper_timeout'),
			);
			if (Date.now() > cartTimeout) {
				//Clear cart after 24 hours
				localStorage.removeItem('cart_glowStopper');
				localStorage.removeItem('cart_glowStopper_timeout');
			} else {
				// Cart is still less than a day old
				if (cartItems) {
					setContextVariables({
						...contextVariables,
						cartItems,
					});
				} else {
					setContextVariables({
						...contextVariables,
						cartItems: [],
					});
				}
			}
		};
		getCartDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					<MetaTags
						title='Glow Stopper - Your one stop online store'
						description='The number one store for all fashion brands'
					/>
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
						<Route path='/products/trending' component={TrendingProducts} exact />
						<Route path='/products/new' component={NewProducts} exact />
						<Route path='/product/view/:productID' exact component={ProductView} />
						<Route
							path='/products/category/:category'
							component={ProductCategory}
							exact
						/>
						<Route path='/order' component={OrderPage} exact />
						<Route
							path='/order/successful/:orderReference'
							component={OrderSuccessful}
							exact
						/>

						{/* Admin Routes */}
						<PublicRoute
							path='/admin/login'
							restricted
							component={AdminLogin}
							exact
						/>
						<PublicRoute
							path='/admin/verify'
							restricted
							component={AdminVerifyAccount}
							exact
						/>
						<PrivateRoute path='/admin/dashboard' component={AdminDashboard} exact />
						<PrivateRoute
							path='/admin/products'
							component={AdminViewProducts}
							exact
						/>
						<PrivateRoute
							path='/admin/product/new'
							component={AdminAddProduct}
							exact
						/>
						<PrivateRoute
							path='/admin/product/edit/:productID'
							component={AdminEditProduct}
							exact
						/>
						<PrivateRoute
							path='/admin/product/description/:productID'
							component={AdminProductDescription}
							exact
						/>
						{/*Admin Product categories */}
						<PrivateRoute
							path='/admin/product/categories'
							component={AdminViewProductCategories}
							exact
						/>

						<PrivateRoute
							path='/admin/product/categories/new'
							component={AdminNewProductCategory}
							exact
						/>
						<PrivateRoute
							path='/admin/product/categories/edit/:categoryID'
							component={AdminEditProductCategory}
							exact
						/>

						<PrivateRoute
							path='/admin/changePassword'
							component={AdminChangePassword}
							exact
						/>
						<PrivateRoute
							path='/admin/orders/view'
							component={AdminViewOrders}
							exact
						/>
						{/* View a particular order reference */}
						<PrivateRoute
							path='/admin/order/details/:orderReference'
							component={AdminViewOrderReference}
							exact
						/>
						<PrivateRoute path='/admins/view' component={ViewAdmins} exact />
						<PrivateRoute path='/admins/new' component={NewAdmin} exact />

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
