import React from "react";

export function Loading() {
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
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                {/* Total Records:{filteredUsers?.length} Of {users?.total} */}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
