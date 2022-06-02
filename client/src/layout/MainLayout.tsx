import Footer from "./Footer";
import Header from "./Header";
import "./MainLayout.scss";
function MainLayout(props: any) {
  return (
    <div className="main">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default MainLayout;