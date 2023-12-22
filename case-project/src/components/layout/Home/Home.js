import "./Home.css";
//import { Custo } from "../../../img";
import customersSvg from "../../../img/customers.svg";
import dashboardSvg from "../../../img/dashboard.svg";
import productsSvg from "../../../img/products.svg";
import reportsSvg from "../../../img/reports.svg";

export function Home(){
    return(
        <div className="home">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div className="card customCard" onClick={(e) => navigate('/customers')}>
                            <img src={customersSvg} className="card-img-top" alt=""></img>
                            <div className="card-body">
                                <h5 className="card-title">Müşteri</h5>
                                <p className="card-text">Müşterileri görüntüleyin.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div className="card customCard" onClick={(e) => navigate('/products')}>
                            <img src={productsSvg} className="card-img-top" alt=""></img>
                            <div className="card-body">
                                <h5 className="card-title">Ürün</h5>
                                <p className="card-text">Ürünleri görüntüleyin.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div className="card customCard" onClick={(e) => navigate('/dashboard')}>
                            <img src={dashboardSvg} className="card-img-top" alt=""></img>
                            <div className="card-body">
                                <h5 className="card-title">Dashboard</h5>
                                <p className="card-text">Verileri görüntüleyin</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div className="card customCard" onClick={(e) => navigate('/reports')}>
                            <img src={reportsSvg} className="card-img-top" alt=""></img>
                            <div className="card-body">
                                <h5 className="card-title">Rapor</h5>
                                <p className="card-text">Raporları görüntüleyin.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function navigate(path){ 
    window.location.href = path;
}