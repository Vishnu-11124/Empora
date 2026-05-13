import React from 'react'
import { Link, Outlet, useLocation } from "react-router-dom"
import { useGetEmployeesQuery } from '../../features/employee/employeeApi'

const Dashboard = () => {

  const location = useLocation()

  const { data, isLoading, isError } = useGetEmployeesQuery()
  console.log(data)

  // Check if user is on add employee page
  const isAddEmployeePage =
    location.pathname === "/admin/dashboard/add-employee"
  
    if(isLoading){
      <p>Loading...</p>
    }

    if(isError){
      <p>Error  </p>
    }

  return (
    <div>

      {/* Show dashboard content only on main dashboard page */}
      {!isAddEmployeePage && (
        <>
         <div>
           <div>
            <input type="text" placeholder='Search Employee' />

            <Link to="/admin/dashboard/add-employee">
              <button>Add Employee</button>
            </Link>
          </div>

          {/* Employee Table */}
          <table border="1">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {
                data.map((employee, index) => (
                  <tr key={employee?._id}>
                    <td>{index + 1}</td>
                    <td>{employee?.name}</td>
                    <td>{employee?.email}</td>
                    <td>{employee?.department}</td>
                    <td>{employee?.salary}</td>
                    <td>{employee?.status === "ACTIVE" }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
         </div>
        </>
      )}

      {/* Nested Routes Render Here */}
      <Outlet />
    </div>
  )
}

export default Dashboard