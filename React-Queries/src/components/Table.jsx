import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export function Table() {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: 5,
    skip: 0,
  });
  
  const limit = parseInt(searchParams.get("limit")) || 5;
  const skip = parseInt(searchParams.get("skip")) || 0;
  
  const {
    isLoading,
    isError,
    data: users,
  } = useQuery({
    queryKey: ["users", limit, skip],
    queryFn: async () =>
      await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`).then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching data.</div>;

  return (
    <section className="data-table-section">
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
