import Header from "./components/header";
import TopMenu from "./components/topMenu";
import ProductCard from "./productCard";

class HomePage {

    header() {
        return new Header()
    }

    topMenu() {
        return new TopMenu()
    }

    productCard() {
        return new ProductCard()
    }
}

export default HomePage;