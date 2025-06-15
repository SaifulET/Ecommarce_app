import Layout from './../component/layout/layout';
import WishListPage from '../component/wish/WishList';
import Brands from '../component/product/brands';

const WishList = () => {

    return (
        <Layout>
            <WishListPage></WishListPage>
            <Brands/>
        </Layout>
    );
};

export default WishList;