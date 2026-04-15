import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function Table() {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: 5,
    skip: 0,
    firstName:""
  });

  
  const limit = parseInt(searchParams.get("limit")) || 5;
  const skip = parseInt(searchParams.get("skip")) || 0;
  const firstName = searchParams.get("firstName") || "";


  const {
    isLoading,
    isError,
    data: users,
  } = useQuery({
    queryKey: ["users", limit, skip, firstName],
    queryFn: async () =>
      await axios
        .get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&firstName=${firstName}`)
        .then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching data.</div>;

    function finduser(e){
      e.preventDefault();
      
    }
  return (
    <section className="data-table-section">
      <form method="post" onSubmit={finduser}>
        <input
          type="search"
          name="firstname"
          placeholder="Search by first name..."
          className="search-input"
        />
      </form>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.address?.country}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Total Records:{users?.users?.length} Of {users?.total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
