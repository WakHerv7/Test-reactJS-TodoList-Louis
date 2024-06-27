import { useContext, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { MdClose } from 'react-icons/md';
import { DataContext } from '../../../context/DataContext';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material'; // Example using MUI TextField
import { z } from 'zod';
import { checkIfExists } from '../../../utils';

const personSchema = z.object({
  name: z.string().min(3, 'Insérez un nom d\'au moins 3 caractères').refine((value) => {
    const exists = checkIfExists(value, 'persons');
    return!exists;
  }, { message: 'Ce nom existe déjà.' }),
  email: z.string().email('Insérez un email valide').refine((value) => {
    const exists = checkIfExists(value, 'persons');
    return!exists;
  }, { message: 'Cet email existe déjà.' }),
  phone: z.string().min(9, 'Insérez un numéro d\'au moins 9 chiffre').refine((value) => {
    const exists = checkIfExists(value, 'persons');
    return!exists;
  }, { message: 'Ce numéro de téléphone existe déjà.' }),
});
type FormData = z.infer<typeof personSchema >


export default function PersonModalForm() {
  const { showPersonModal, updateStateShowPersonModal, addPerson, updatePerson, getOnePerson } = useContext(DataContext);

  const { 
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: showPersonModal.person?.name ?? '',      
      email: showPersonModal.person?.email ?? '',
      phone: showPersonModal.person?.phone ?? '',
    },
  });

  const handleClose = () => {
    updateStateShowPersonModal({...showPersonModal, person:{}, open:false, mode:''});
  }

  const onSubmit = (data:FormData) => {
      if (showPersonModal.person?.id && showPersonModal.mode==='editForm') {
        const id = showPersonModal.person?.id;
        updatePerson(Number(id),{
          id: id,
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      } else {
        if (data.name && data.email && data.phone) {
          const newPerson = {
            id: faker.number.int(),
            name: data.name,
            email: data.email,
            phone: data.phone,
          };
          addPerson(newPerson);
        }
      }
      handleClose();
  }

  return (
    <div className={``}>
        
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[400px]">
        <div className="relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <MdClose 
            onClick={handleClose}
            size={20}
            className='absolute top-4 right-4 cursor-pointer'/>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Ajouter une nouvelle personne</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Veuillez remplir les informations ci-dessous.</p>

                <div className="mt-5 grid grid-cols-1 gap-3">
                    <div className="">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nom complet</label>
                        <div className="mt-2">
                            <input 
                            {...register("name")}
                            type="text" 
                            name="name" 
                            id="name"
                            placeholder="Nom complet"
                            className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`}                            
                            />
                            <small className={`text-xs text-red-600`}>{errors.name?.message}</small>
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input
                            {...register("email")}
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="abc@email.xyz"
                            className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`}                            
                            />
                            <small className={`text-xs text-red-600`}>{errors.email?.message}</small>
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Telephone</label>
                        <div className="mt-2">
                            <input 
                            {...register("phone")}
                            type="text" 
                            name="phone" 
                            id="phone" 
                            placeholder="+237 xxx xxx xxx"
                            className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`}
                            />
                            <small className={`text-xs text-red-600`}>{errors.phone?.message}</small>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 mt-3 sm:flex sm:flex-row-reverse">
                    <button 
                    type="submit"
                    className={`inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 
                    text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto`}>
                        Enregistrer
                    </button>
                    <button 
                    type="button" 
                    onClick={handleClose}
                    className={`mt-3 inl0ine-flex w-full justify-center rounded-md bg-white px-3 py-2 
                    text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    hover:bg-gray-50 sm:mt-0 sm:w-auto`}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
        
    </div>
    </div>
  )
}
