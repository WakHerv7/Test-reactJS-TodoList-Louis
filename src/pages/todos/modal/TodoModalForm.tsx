import { useContext, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { MdClose } from 'react-icons/md';
import { DataContext } from '../../../context/DataContext';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Box, Chip,  FormControl,  MenuItem, OutlinedInput, TextField } from '@mui/material'; 
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import _ from 'lodash/fp';
import { z } from 'zod';
import { checkIfExists } from '../../../utils';
import { Labels, Person } from '../../../models';

interface Label {
  value: string;
  label: string;
}
 
const priorities = [
  {value:'low', label:'Faible'},
  {value:'medium', label:'Moyen'},
  {value:'high', label:'Elevé'},
];

const labels = [
  {value:'html', label:'HTML', color:'red'},
  {value:'css', label:'CSS', color:'blue'},
  {value:'jquery', label:'JQuery', color:'green'},
  {value:'nodejs', label:'NodeJS', color:'black'},
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const todoSchema = z.object({
  title: z.string({message:'Insérez un titre à votre tâche'}).refine((value) => {
    const exists = checkIfExists(value, 'todos');
    return!exists;
  }, { message: 'Cette tâche existe déjà' }),
  person: z.object({
    id: z.number(),
    name: z.string({message:'Choisir une personne'}),
    email: z.string().email(),
    phone: z.string(),
  }),
  startDate: z.date({message:'Insérez une date de debut'}),
  endDate: z.date({message:'Insérez une date de fin'}),
  priority: z.string({message:'Choisir la priorité'}),
  labels: z.string({message:'Choisir un label'}).array(),
  description: z.string().optional(),
});
type FormData = z.infer<typeof todoSchema >


export default function TodoModalForm() {
  const { persons, showTodoModal, updateStateShowTodoModal, addTodo, updateTodo, getOneTodo } = useContext(DataContext);

  const { 
    register,
    control,
    handleSubmit,
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title:"",
      startDate: new Date(), 
      endDate: new Date(),
      person: {id:0, name:"", email:"", phone:""},
      priority: "",
      description: "",
    },
  });


  const handleClose = () => {
    updateStateShowTodoModal({...showTodoModal, todo:{}, open:false, mode:''});
  }

  const onSubmit = (data:FormData) => {
    console.log("onSubmit : ", data);    
    const newTodo = {...data, id: faker.number.int()}
    addTodo(newTodo);
    
      // if (showTodoModal.todo?.id && showTodoModal.mode==='editForm') {
      //   const id = showTodoModal.todo?.id;
      //   updateTodo(Number(id),{
      //     id: id,
      //     name: data.name,
      //     email: data.email,
      //     phone: data.phone,
      //   });
      // } else {
      //   if (data.name && data.email && data.phone) {
      //     const newTodo = {
      //       id: faker.number.int(),
      //       name: data.name,
      //       email: data.email,
      //       phone: data.phone,
      //     };
      //     addTodo(newTodo);
      //   }
      // }
      // handleClose();
  }

  return (
    <div className={``}>
        
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[1000px]">
        <div className="relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <MdClose 
            onClick={handleClose}
            size={20}
            className='absolute top-4 right-4 cursor-pointer'/>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Ajouter une nouvelle tache</h2>
                <div className="mt-5 grid grid-cols-1 gap-3">
                    <div className="">
                        <div className="mt-2">
                            <Controller
                              name="title"
                              control={control}
                              render={({field}:{ field:any }) => (
                                <TextField
                                  label="Titre de la tache"
                                  sx={{width:'100%'}}
                                  value={field.value}
                                  onChange={(newValue) => field.onChange(newValue)}
                                  
                                />
                              )}
                            />
                            <small className={`text-xs text-red-600`}>{errors.title?.message}</small>
                        </div>
                    </div>


                    <div className='flex gap-3 w-full'>
                        <div className="">                        
                            <div className="mt-2">
                                <Controller
                                  name="person"
                                  control={control}
                                  render={({field}) => (
                                    <Autocomplete
                                      {...field}
                                      disablePortal
                                      id="person-select"
                                      options={persons}
                                      getOptionLabel={(option:any) => option.name}
                                      isOptionEqualToValue={(option: Person, value: Person) =>
                                        _.isEqual(option, value)
                                      }
                                      sx={{ width: '150px' }}
                                      defaultValue={{id:0, name:"", email:"", phone:""}}
                                      value={field.value as unknown as Person} 
                                      onChange={(_, data) => field.onChange(data)}
                                      renderInput={(params) => <TextField {...params} label="Staff" />}
                                    />
                                  )}
                                />
                                <small className={`text-xs text-red-600`}>{errors.person?.message}</small>
                            </div>
                        </div>
                        <div className="">
                            <div className="mt-2">
                                <Controller
                                  name="startDate"
                                  control={control}
                                  render={({field}:{ field:any }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                      <DatePicker
                                        label="Date de debut"
                                        value={field.value}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        sx={{width:'100%'}}                                    
                                      />
                                    </LocalizationProvider>
                                  )}
                                />
                                <small className={`text-xs text-red-600`}>{errors.startDate?.message}</small>
                            </div>
                        </div>
                        <div className="">
                            <div className="mt-2">
                                <Controller
                                  name="endDate"
                                  control={control}
                                  render={({field}:{ field:any }) => (
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                      <DatePicker
                                        label="Date de fin"
                                        value={field.value}
                                        onChange={(newValue) => field.onChange(newValue)}
                                        sx={{width:'100%'}}                                    
                                      />
                                    </LocalizationProvider>
                                  )}
                                />
                                <small className={`text-xs text-red-600`}>{errors.endDate?.message}</small>
                            </div>
                        </div>
                        <div className="">
                            <div className="mt-2">
                                {/* <InputLabel>Age</InputLabel> */}
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                      <FormControl variant="outlined" sx={{ width: '150px' }}>
                                      <InputLabel id="priorityId-label">Priorité</InputLabel>
                                      <Select
                                        labelId="priorityId-label"
                                        id="priorityId"
                                        label="Priorité"
                                        {...field}
                                        defaultValue={''}
                                        value={field.value}
                                        onChange={event => field.onChange(event.target.value)}
                                        input={<OutlinedInput label="Priority" />}
                                        MenuProps={MenuProps}
                                      >
                                        {priorities.map((p, index) => (
                                          <MenuItem key={index} value={p.value}>
                                            {p.label}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      </FormControl>
                                    )}
                                  />
                                <small className={`text-xs text-red-600`}>{errors.priority?.message}</small>
                            </div>
                        </div>
                        <div className="">                        
                            <div className="mt-2">
                                <Controller
                                    name="labels"
                                    control={control}
                                    render={({ field }) => (
                                      <FormControl variant="outlined" sx={{ width: '200px' }}>
                                      <InputLabel id="priorityId-label">Label</InputLabel>
                                      <Select
                                        labelId="labelsId-label"
                                        id="labelsId"
                                        sx={{width:'200px'}}
                                        multiple
                                        {...field}
                                        value={field.value?.length > 0 ? field.value as string[] | "" : []}
                                        onChange={event => field.onChange([...event.target.value])}
                                        input={<OutlinedInput label="Label" />}
                                        renderValue={(selected:string[]) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value:any) => (
                                              <Chip key={value} label={value} />
                                            ))}
                                          </Box>
                                        )}
                                        MenuProps={MenuProps}
                                      >
                                        {labels.map((label, index) => (
                                          <MenuItem key={index} value={label.value}>
                                            {label.label}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                      </FormControl>
                                    )}
                                  />
                                <small className={`text-xs text-red-600`}>{errors.labels?.message}</small>
                            </div>
                        </div>
                    </div>
                    
                    <div className="">
                        <div className="mt-2">
                            <Controller
                              name="description"
                              control={control}
                              render={({field}:{ field:any }) => (
                                <TextField
                                  label="Description"
                                  multiline
                                  rows={4}
                                  sx={{width:'100%'}}
                                  value={field.value}
                                  onChange={(newValue) => field.onChange(newValue)}
                                />
                              )}
                            />
                            <small className={`text-xs text-red-600`}>{errors.description?.message}</small>
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
