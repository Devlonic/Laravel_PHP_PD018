import { LegacyRef, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import { randomUUID } from "crypto";
import ReactLoading from "react-loading";
import dayjs from "dayjs";
import { http_common } from "../../../services/tokenService";
import { APP_ENV } from "../../../env";
import {
  IProductGetResult,
  IProductItem,
} from "../../admin/product/list/types";

const ProductListIndexPage = () => {
  const deleteDialog = useRef();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<IProductItem[]>([
    // {
    //     id: 1,
    //     name: "SSD",
    //     description: "Для швикдих людей"
    // }
  ]);
  const [data, setData] = useState<IProductGetResult>();

  const { page } = useParams();
  let localpage;

  useEffect(() => {
    // if user has defined page in url - use it. Either use first page
    if (page == undefined || page == null) localpage = 1;
    else localpage = page;

    console.log("try to get categories from server page " + localpage);
    setIsLoading(true);
    http_common
      .get<IProductGetResult>(
        `${APP_ENV.BASE_URL}api/product?page=${localpage}`
      )
      .then((resp) => {
        setIsLoading(false);
        console.log("Сервак дав дані", resp);
        setList(resp.data.data);
        setData(resp.data);
      })
      .catch((e) => {
        console.log("get products from server error: ", e);
        setIsLoading(false);
      });

    console.log("use Effect end");
  }, [page]);

  console.log("Render component");

  const paginationData = data?.links.map((l) => (
    <li
      key={Math.random()}
      className={classNames("page-item", {
        active: l.active,
        disabled: l.url == null,
      })}
    >
      <Link
        to={
          l.url
            ? `/page/${new URLSearchParams(new URL(l.url as string).search).get(
                "page"
              )}`
            : ""
        }
        className="page-link"
      >
        {l.label.replace("&laquo; ", "").replace(" &raquo;", "")}
      </Link>
    </li>
  ));

  const viewData = list.map((product) => (
    <div
      className="card m-2"
      style={{ width: "18rem", minHeight: "25rem" }}
      key={product.id}
    >
      <div
        className="slider-wrapper"
        style={{ minHeight: "20rem", maxHeight: "20rem" }}
      >
        <div
          id={`productImagesSlider-${product.id}`}
          className="carousel slide card-img-top"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {product.images.map((i, index) => (
              <button
                key={index}
                type="button"
                data-bs-target={`#productImagesSlider-${product.id}`}
                data-bs-slide-to={index}
                className={classNames("", { active: index == 0 })}
                aria-current={index == 0}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {product.images.map((i) => (
              <div
                className={classNames("carousel-item", {
                  active: i.priority == 0,
                })}
                key={Math.random()}
              >
                <img
                  src={APP_ENV.BASE_URL + "/storage/" + i.name}
                  className="d-block w-100"
                  alt="..."
                ></img>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#productImagesSlider-${product.id}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#productImagesSlider-${product.id}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {product.category.name}
        </h6>
      </div>
      <Link
        to={`/admin/product/delete/${product.id}`}
        className="btn btn-primary m-1 disabled"
      >
        Купити
      </Link>
    </div>
  ));

  return (
    <>
      <h1 className="text-center">Список товарів</h1>
      {isLoading && (
        <div className="">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <ReactLoading
                  type="bars"
                  color="gray"
                  height={"50%"}
                  width={"50%"}
                ></ReactLoading>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="onLoad">
          <div className="container">
            <div className="d-flex p-2">{viewData}</div>
          </div>
          <ul className="pagination justify-content-center">
            {paginationData}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductListIndexPage;
