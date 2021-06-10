import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './components/pages/Homepage';
import Footer from './components/layout/Footer';
import PageNotFound from './components/pages/PageNotFound';
import ScrollToTop from './components/layout/ScrollToTop';
import FloatingActionButton from './components/layout/FloatingActionButton';
import Cart from './components/pages/Cart';
import Contact from './components/pages/Contact';
import Products from './components/pages/product pages/Products';
import ProductCategory from './components/pages/product pages/ProductCategory';
import ProductView from './components/pages/product pages/ProductView';

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
	return (
		<div className={classes.root}>
			<BrowserRouter>
				<Navbar />
				<ScrollToTop />
				<Switch>
					<Route path='/' component={Homepage} exact />
					<Route path='/cart' component={Cart} exact />
					<Route path='/contact' component={Contact} exact />
					<Route path='/products' component={Products} exact />
					<Route path='/product/view/:productID' exact component={ProductView} />
					<Route
						path='/products/category/:category'
						component={ProductCategory}
						exact
					/>
					<Route path='*' component={PageNotFound} />
				</Switch>
				<FloatingActionButton />
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
