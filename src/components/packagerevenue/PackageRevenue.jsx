import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getAllPayment } from "../../api/orderApi";

const PackageRevenue = () => {
  const [payments, setPayments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getAllPayments(1, 5);
  }, []);

  function getAllPayments(page, limit) {
    getAllPayment(page, limit)
      .then((response) => {
        console.log(response.data);
        setPayments(response.data.content);
        setTotalPages(response.data.meatadataDTO.total); // Sửa lại để tính đúng số trang
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handlePageClick = (event) => {
    getAllPayments(+event.selected + 1, 5);
  };

  return (
    <div className="container">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center">Package Code</th>
            <th className="text-center">Package Name</th>
            <th className="text-center">Number of Sales</th>
            <th className="text-center">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.code}>
              <td>{payment.code}</td>
              <td>{payment.name}</td>
              <td>{payment.quantity}</td>
              <td>{payment.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default PackageRevenue;
