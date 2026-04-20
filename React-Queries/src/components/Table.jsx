import React from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Loading } from "./Loading";

export function Table() {
  const [searchParams, setSearchParams] = useSearchParams({
    limit: 5,
    skip: 0,
    q: "",
    gender: "",
  });

  const limit = parseInt(searchParams.get("limit")) || 5;
  const skip = parseInt(searchParams.get("skip")) || 0;
  const q = searchParams.get("q") || "";
  const gender = searchParams.get("gender") || "";

  const {
    isLoading,
    isError,
    data: users,
  } = useQuery({
    queryKey: ["users", limit, skip, q, gender],
    queryFn: async () =>
      await axios
        .get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&q=${q}`)
        .then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const filteredUsers = users?.users?.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

    const matchSearch = fullName.includes(q.toLowerCase());

    const matchGender =
      !gender || user.gender.toLowerCase() === gender.toLowerCase();

    if (gender == "All Genders") {
      return matchSearch;
    }
    return matchSearch && matchGender;
  });
  

  if (isLoading) return <Loading />;
  if (isError) return <div>Error occurred while fetching data.</div>;

  return (
    <section className="data-table-section">
      <div className="input-div">
        <input
          type="search"
          name="firstname"
          placeholder="Search by first name..."
          className="search-input"
          onChange={(e) => {
            setSearchParams((prev) => {
              return {
                ...Object.fromEntries(prev),
                q: e.target.value,
              };
            });
          }}
        />
        <select
          name="gender"
          className="search-input"
          onChange={(e) => {
            setSearchParams((prev) => {
              return {
                ...Object.fromEntries(prev),
                gender: e.target.value,
              };
            });
          }}
        >
          <option value="All Genders">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
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
            {filteredUsers?.map((user) => (
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
              <td colSpan="3" style={{ textAlign: "center" }}>
                Total Records:{filteredUsers?.length} Of {users?.total}
              </td>
              <td colSpan="4" style={{ textAlign: "center" }}>
                <button
                  className="Pagination-btn"
                  onClick={() => {
                    setSearchParams((prev) => {
                      return {
                        ...Object.fromEntries(prev),
                        skip: Math.max(0, skip - limit),
                      };
                    });
                  }}
                >
                  Previous
                </button>
                <button
                  className="Pagination-btn"
                  onClick={() => {
                    setSearchParams((prev) => {
                      return {
                        ...Object.fromEntries(prev),
                        skip: skip + limit,
                      };
                    });
                  }}
                >
                  Next
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
