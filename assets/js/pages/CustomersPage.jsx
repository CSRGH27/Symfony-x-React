import React, { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import Pagination from "../components/Pagination";

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get("https://127.0.0.1:8000/api/customers")
      .then((response) => response.data["hydra:member"])
      .then((data) => setCustomers(data))
      .catch((error) => console.log(error.response));
  }, []);

  /**
   * Dans cette function on supprime en premier le customer dans le state customers qui permet davoir une suppreson visue rapoide pour le user
   * ensuite on envoie nottre requette http pour supprimer sur le serveur, si cela ne marche pas on reajoute le customer quon a supprime visuelement
   * grace a la const originalCustomer
   * @param {*} id
   */
  const handleDelete = (id) => {
    /**
     * les trois dot permet diterer sur un tableau et de sortir chaque elements
     */
    const originalCustomer = [...customers];
    /**
     * La methode filter va retourner les elements d'un tableau qui corresponde a la condition (Ici les elemts qui ont un id differrent de l'id qu'on supprime)
     */
    setCustomers(customers.filter((customer) => customer.id !== id));

    Axios.delete("https://127.0.0.1:8000/api/customers/" + id)
      .then((response) => {
        alert("Customer deleted");
      })
      .catch((error) => {
        setCustomers(originalCustomer);
        console.log(error.response);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };

  /**
   * Ici on filtre la recherche, on filtre le tableau en voulant les nom et premom des customer  et on inclue juste ceux egale a notre sate search
   */
  const itemsPerPage = 15;
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
      customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.company.toLowerCase().includes(search.toLowerCase())
  );

  /**
   * On va chercher la methode getData de Pagination pour recuperer les customers pagine
   */
  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  return (
    <Fragment>
      <h1>List of customer</h1>

      <div className="form-group">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="form-control"
          placeholder="Search ..."
        />
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Company</th>
            <th className="text-center">Invoices</th>
            <th className="text-center">Total amount</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {paginatedCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <a href="#">
                  {customer.lastname} {customer.firstname}
                </a>
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td className="text-center">
                <span className="badge badge-primary">
                  {customer.invoices.length}
                </span>
              </td>
              <td className="text-center">
                {customer.totalAmount.toLocaleString("fr", {
                  maximumFractionDigits: 2,
                })}
                €
              </td>
              <td>
                <button
                  onClick={() => handleDelete(customer.id)}
                  disabled={customer.invoices.length > 0}
                  title={
                    customer.invoices.length > 0
                      ? "Unable to delete a user who has invoices"
                      : ""
                  }
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={filteredCustomers.length}
        onPageChange={handlePageChange}
      />
    </Fragment>
  );
};

export default CustomersPage;
