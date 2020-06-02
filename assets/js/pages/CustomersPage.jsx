import React, { Fragment, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import customersAPI from "../services/customersAPI";

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  /**
   * Permet d'aller chercher les customer
   */
  const fetchCustomers = async () => {
    try {
      const data = await customersAPI.findAll();
      setCustomers(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  /**
   * Au chargement on appelle la function fetchCustomers
   */
  useEffect(() => {
    fetchCustomers();
  }, []);

  /**
   * GESTION DE LA SUPPRESIION DES CUSTOMERS
   *
   * Dans cette function on supprime en premier le customer dans le state customers qui permet davoir une suppreson visue rapoide pour le user
   * ensuite on envoie nottre requette http pour supprimer sur le serveur, si cela ne marche pas on reajoute le customer quon a supprime visuelement
   * grace a la const originalCustomer
   * @param {*} id
   */
  const handleDelete = async (id) => {
    /**
     * les trois dot permet diterer sur un tableau et de sortir chaque elements
     */
    const originalCustomer = [...customers];
    /**
     * La methode filter va retourner les elements d'un tableau qui corresponde a la condition (Ici les elemts qui ont un id differrent de l'id qu'on supprime)
     */
    setCustomers(customers.filter((customer) => customer.id !== id));
    try {
      await customersAPI.delete(id);
    } catch (error) {
      setCustomers(originalCustomer);
      console.log(error.response);
    }
  };

  /**
   * Gestion du changement de page
   * @param {*} page
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /**
   * Gestion de la recherche
   *
   * @param {*} event
   */
  const handleSearch = (currentTarget) => {
    setSearch(currentTarget.value);
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
