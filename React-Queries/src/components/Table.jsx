import React from 'react'

export function Table() {
  return (
    <section className="data-table-section">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john.doe@example.com</td>
                <td>30</td>
                <td>(555) 123-4567</td>
              </tr>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john.doe@example.com</td>
                <td>30</td>
                <td>(555) 123-4567</td>
              </tr>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john.doe@example.com</td>
                <td>30</td>
                <td>(555) 123-4567</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" style={{textAlign:'center'}}>Total Records: 3</td>
              </tr>
            </tfoot>
          </table>
        </div>
    </section>
  )
}
