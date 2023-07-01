import { LegacyRef, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { IProductGetResult, IProductItem } from "./types";
import classNames from "classnames";
import { randomUUID } from "crypto";
import ReactLoading from "react-loading";
import { APP_ENV } from "../../../../env";
import { http_common } from "../../../../services/tokenService";
import dayjs from "dayjs";

const ProductListPage = () => {
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
            ? `/admin/product/page/${new URLSearchParams(
                new URL(l.url as string).search
              ).get("page")}`
            : ""
        }
        className="page-link"
      >
        {l.label.replace("&laquo; ", "").replace(" &raquo;", "")}
      </Link>
    </li>
  ));

  const viewData = list.map((product) => (
    <tr key={product.id}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      {/* <td>
        <img src={APP_ENV.BASE_URL + "/storage/" + category.image} width={50} />
      </td> */}
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <img
          title={product.category?.name}
          alt={product.category?.name}
          src={APP_ENV.BASE_URL + "/storage/" + product.category.image}
          width={50}
        />
      </td>
      <td>{dayjs(product.created_at).format("DD/MM/YYYY HH:mm:ss")}</td>
      <td>{dayjs(product.updated_at).format("DD/MM/YYYY HH:mm:ss")}</td>
      <td>
        <Link
          to={`/admin/product/edit/${product.id}`}
          className="btn btn-primary m-1 disabled"
        >
          Edit
        </Link>
        <Link
          to={`/admin/product/delete/${product.id}`}
          className="btn btn-danger m-1 disabled"
        >
          Delete
        </Link>
      </td>
    </tr>
  ));
  //console.error("Сало");

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
          <Link to="/admin/product/create" className="btn btn-success">
            Додати
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Назва</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{viewData}</tbody>
          </table>
          <ul className="pagination justify-content-center">
            {paginationData}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductListPage;
