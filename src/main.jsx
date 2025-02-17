import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './store/Store.js'
import TeacherLogin from './Components/Login/Login.jsx'
import TeacherSignup from './Pages/TeacherSignup/TeacherSignup.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import ProtectedRoute from './Components/Protect/ProtectedRoute.jsx'
import Layout from './layouts/Layout.jsx'
import TeacherProfile from './Pages/profile/TeacherProfile.jsx'
import ViewPlaylist from './Pages/ViewPlaylist/ViewPlaylist.jsx'
import ManagePlaylist from './Pages/ManagePlaylist/ManagePlaylist.jsx'
import Exam from './Pages/Exam/Exam.jsx'
import EvaluateExam from './Pages/EvaluateExam/EvaluateExam.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
     {
      path:"/login",
      element:<TeacherLogin/>
     }, {
        path:"/signup",
        element:<TeacherSignup/>
      },{
        path:"",
        element:(
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        )
      },{
        path:"/profile",
        element:(
          <ProtectedRoute>
            <TeacherProfile/>
          </ProtectedRoute>
        )
      },{
        path:"/view-playlist",
        element:(
          <ProtectedRoute>
            <ViewPlaylist/>
          </ProtectedRoute>
        )
      },{
        path:"/manage-playlist",
        element:(
          <ProtectedRoute>
            <ManagePlaylist/>
          </ProtectedRoute>
        )
      }
      ,{
        path:"/create-exam",
        element:(
          <ProtectedRoute>
            <Exam/>
          </ProtectedRoute>
        )
      },{
        path:"/evaluate-exam",
        element:(
          <ProtectedRoute>
            <EvaluateExam/>
          </ProtectedRoute>
        )
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
