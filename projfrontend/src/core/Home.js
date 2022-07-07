import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
    <Base title="Outfit Haul" description="Welcome to the Clothing Store">
<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={require("./../show1.jpg")} className="d-block w-100" alt="..."></img>
    </div>
    <div className="carousel-item">
      <img src={require("./../show2.jfif")} className="d-block w-100" alt="..."></img>
    </div>
    <div className="carousel-item">
      <img src={require("./../show3.jpg")} className="d-block w-100" alt="..."></img>
    </div>
  </div>
  <a className="carousel-control-prev" type="button" href="#carouselExampleIndicators" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" type="button" href="#carouselExampleIndicators" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

<div className="container-xxl mb-4 ">
	<div className="card mt-4 rounded p-3">
		<div className="row">
			<div className="col-md-4  px-5">
				<i className="fa fa-truck fa-2x text-secondary"></i>
				<h5 className="pt-2 text-dark">Fast delivery</h5>
				<p className="pt-2 text-muted">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore</p>
			</div>
			<div className="col-md-4 pl-5 pr-5">
				<i className="fa fa-2x fa-heart text-danger"></i>
				<h5 className="pt-2 text-dark">Creative Strategy</h5>
				<p className="pt-2 text-muted">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore</p>
			</div>
			<div className="col-md-4  pl-5 pr-5">
				<i className="fa fa-2x fa-shield text-warning"></i>
				<h5 className="pt-2 text-dark">Highly secured</h5>
				<p className="pt-2 text-muted">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore</p>
			</div>
		</div>
	</div>
</div>

      <div className="row text-center">
        <h1 className="text-dark" style={{marginLeft: "40%"}}>Our Products</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
