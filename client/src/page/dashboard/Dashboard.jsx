import React, { useState } from 'react'
import { Link, Outlet, useLocation } from "react-router-dom"
import { useGetEmployeesQuery } from '../../features/employee/employeeApi'
import { Users, Search, UserPlus, X, Briefcase, Mail, DollarSign, Hash, CircleDot, Trash2, CheckCircle2, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const location = useLocation()
  const { data, isLoading, isError } = useGetEmployeesQuery()
  const employees = data?.data || []

  const isAddEmployeePage = location.pathname === "/admin/dashboard/add-employee"

  const [input, setInput] = useState('')
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [employee, setEmployee] = useState({})
  const [status, setStatus] = useState("ACTIVE")

  const handleSearch = (e) => setInput(e.target.value)

  const handleOpenModel = (employee) => {
    setIsModelOpen(true)
    setEmployee(employee)
  }

  const handleCloseModel = () => {
    setIsModelOpen(false)
    setEmployee({})
  }

  const filtered = employees
    .filter((emp) => emp?.status === status)
    .filter((emp) =>
      emp?.name?.toLowerCase().includes(input.toLowerCase()) ||
      emp?.email?.toLowerCase().includes(input.toLowerCase()) ||
      emp?.department?.toLowerCase().includes(input.toLowerCase())
    )

  const activeCount = employees.filter(e => e?.status === "ACTIVE").length
  const departments = [...new Set(employees.map(e => e?.department).filter(Boolean))].length

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Loading employees...</p>
      </div>
    </div>
  )

  if (isError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-red-500 text-sm font-medium">Failed to load employees. Please try again.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAddEmployeePage && (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage and monitor your workforce</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Total Employees",
                value: employees.length,
                icon: <Users size={20} className="text-emerald-600" />,
                bg: "bg-emerald-50",
              },
              {
                label: "Active",
                value: activeCount,
                icon: <TrendingUp size={20} className="text-blue-600" />,
                bg: "bg-blue-50",
              },
              {
                label: "Departments",
                value: departments,
                icon: <Briefcase size={20} className="text-violet-600" />,
                bg: "bg-violet-50",
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-sm">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={input}
                onChange={handleSearch}
                placeholder="Search by name, email or department..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
            >
              <option value="ACTIVE">All</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            <Link to="/admin/dashboard/add-employee">
              <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-xl whitespace-nowrap">
                <UserPlus size={16} />
                Add Employee
              </button>
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    {["No", "Name", "Email", "Department", "Salary", "Status", "Details", "Action"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center text-gray-400 text-sm py-12">
                        No employees found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((emp, index) => (
                      <tr key={emp?._id} className="hover:bg-gray-50/50 transition-colors">

                        <td className="px-5 py-4 text-gray-400 font-medium">{index + 1}</td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center uppercase shrink-0">
                              {emp?.name?.charAt(0)}
                            </div>
                            <span className="font-semibold text-gray-800">{emp?.name}</span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-gray-500">{emp?.email}</td>

                        <td className="px-5 py-4">
                          <span className="bg-violet-50 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                            {emp?.department}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-gray-700 font-semibold">
                          ${Number(emp?.salary).toLocaleString()}
                        </td>

                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${
                            emp?.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-500"
                          }`}>
                            <CircleDot size={10} />
                            {emp?.status}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            onClick={() => handleOpenModel(emp)}
                            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                          >
                            View
                          </button>
                        </td>

                        <td className="px-5 py-4">
                          {emp?.status === "ACTIVE" ? (
                            <button className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                              <Trash2 size={13} /> Delete
                            </button>
                          ) : (
                            <button className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
                              <CheckCircle2 size={13} /> Activate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModelOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 text-white font-bold text-lg flex items-center justify-center uppercase">
                  {employee?.name?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-white font-bold text-base">{employee?.name}</h2>
                  <p className="text-emerald-200 text-xs">{employee?.department}</p>
                </div>
              </div>
              <button
                onClick={handleCloseModel}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-3">
              {[
                { icon: <Hash size={15} className="text-gray-400" />, label: "Employee ID", value: employee?._id },
                { icon: <Mail size={15} className="text-gray-400" />, label: "Email", value: employee?.email },
                { icon: <Briefcase size={15} className="text-gray-400" />, label: "Department", value: employee?.department },
                { icon: <DollarSign size={15} className="text-gray-400" />, label: "Salary", value: `$${Number(employee?.salary).toLocaleString()}` },
                { icon: <CircleDot size={15} className="text-gray-400" />, label: "Status", value: employee?.status },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    {row.icon}
                    <span>{row.label}</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    row.label === "Status"
                      ? employee?.status === "ACTIVE"
                        ? "text-emerald-600"
                        : "text-gray-400"
                      : "text-gray-700"
                  }`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={handleCloseModel}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  )
}

export default Dashboard