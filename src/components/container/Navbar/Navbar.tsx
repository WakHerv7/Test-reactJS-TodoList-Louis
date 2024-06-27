import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar({title}:{title:string}) {
    const navLink = [
        {
            link:'/persons',
            label:'Person List',
        },
        {
            link:'/todos',
            label:'Todo List',
        },
        {
            link:'/data',
            label:'Item List',
        },
        {
            link:'/add',
            label:'Add New Item',
        },
    ];
  return (
    <nav className='bg-slate-100 flex justify-between items-center px-5 py-2'>
        <h2 className={`text-2xl font-bold`}>{title}</h2>
      <div className={`flex items-center bg-slate-100 gap-5`}>
        {navLink.map((nl, idx) => 
            <Link 
            key={idx} 
            to={nl.link}
            className={`text-slate-500 hover:text-slate-800`}
            >{nl.label}</Link>
        )}        
        </div>
    </nav>
  )
}
