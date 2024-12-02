// import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
import { RootState } from '../redux/store'

export default function OnlyAdmin() {
    const {currentUser} = useSelector((state: RootState) => state.user)
  return currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to ='/'/>;
}