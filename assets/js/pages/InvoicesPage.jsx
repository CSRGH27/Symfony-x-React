import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import invoicesApi from "../services/invoicesApi";
import Pagination from "../components/Pagination";

const InvoicesPage = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const STATUS_CLASS = {
    PAID: "success",
    SENT: "warning",
    CANCELLED: "danger",
  };

  const fetchInvoice = async () => {
    try {
      const data = await invoicesApi.findAll();
      setInvoices(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 25;

  const paginatedInvoices = Pagination.getData(
    invoices,
    currentPage,
    itemsPerPage
  );

  /**
   * Permet de formater la date avec la librairie format.js
   */
  const formatDate = (str) => {
    return moment(str).format("DD/MM/YYYY");
  };

  return (
    <Fragment>
      <h1>List of Ivoices</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Numero</th>
            <th>Customer</th>
            <th className="text-center">Sent at</th>
            <th className="text-center">Status</th>
            <th className="text-center">Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.chrono}</td>
              <td>
                <a href="#">
                  {invoice.customer.lastname} {invoice.customer.firstname}
                </a>
              </td>
              <td className="text-center">{formatDate(invoice.sentAt)}</td>
              <td className="text-center">
                <span className={"badge badge-" + STATUS_CLASS[invoice.status]}>
                  {invoice.status}
                </span>
              </td>
              <td className="text-center">
                {invoice.amount.toLocaleString("fr", {
                  maximuFractionDigits: 2,
                })}{" "}
                €
              </td>
              <td>
                <button className="btn btn-sm btn-primary mr-1">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={invoices.length}
        onPageChange={handlePageChange}
      />
    </Fragment>
  );
};

export default InvoicesPage;
