import { createBrowserRouter,RouterProvider, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/navbar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Pages/Home'
import Jobs from './components/Pages/Jobs'
import Browse from './components/Pages/Browse'
import Profile from './components/Profile'
import JobDetails from './components/Pages/JobDetails'
import Comapnies from './admin/Pages/Comapnies'
import AdminJobs from './admin/Pages/AdminJobs'
import CreateCompany from './admin/Pages/CreateCompany'
import CompanySetUp from './admin/Pages/CompanySetUp'
import AdminJobSetup from './admin/Pages/AdminJobSetup'
import CreateAdminJob from './admin/Pages/CreateAdminJob'
import Applicants from './admin/Pages/Applicants'
import ProtectedRoute from './admin/ProtectedRoute.jsx'
import UserProtectingRoutes from './components/UserProtectingRoutes.jsx'
import { useSelector } from 'react-redux'
import NotFound from './components/Pages/NotFound'




function App() {

 
  const router=createBrowserRouter([


    {
      path:'/',
      element:<UserProtectingRoutes><Home/></UserProtectingRoutes>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/jobs',
      element:<UserProtectingRoutes><Jobs/></UserProtectingRoutes>
    },
    {
     path:'/Jobdetails/:id',
     element:<UserProtectingRoutes><JobDetails/></UserProtectingRoutes>
    },
    {
      path:'/browse',
      element:<UserProtectingRoutes><Browse/></UserProtectingRoutes>
    },
    {
    path:'/profile',
    element:<UserProtectingRoutes><Profile/></UserProtectingRoutes>
    },
  
    //admin routes
  
     {
      path:'/admin/companies',
      element:<ProtectedRoute><Comapnies/></ProtectedRoute>
     },
     {
      path:'/admin/jobs',
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
     },
     {
      path:'/admin/jobs/create',
      element:<ProtectedRoute><CreateAdminJob/></ProtectedRoute>
     },
     {
      path:'/admin/jobs/:id',
      element:<ProtectedRoute><AdminJobSetup/></ProtectedRoute>
     },
     {
      path:'/admin/companies/create',
      element:<ProtectedRoute><CreateCompany/></ProtectedRoute>
     },
     {
      path:'/admin/companies/:id',
      element:<ProtectedRoute><CompanySetUp/></ProtectedRoute>
     },
     {
      path:'/admin/jobs/:id/applicants',
      element:<ProtectedRoute><Applicants/></ProtectedRoute>
     },
     {
      path:'*',
      element:<NotFound/>
     }
   
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
