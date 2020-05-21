import React,{useState,useEffect,useContext} from 'react'
import {MovieContext} from '../utils/MovieContext'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'


export default function UpdateMovie() {

    const {movieList, getMovieList} = useContext(MovieContext)


    const id = useParams().id
   
    const initial = {
        title:'',
        director:'',
        metascore:'',
        stars:[],
    }
    
    const [movie,setMovie]= useState(initial)

    const {push} =useHistory()
   


    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>setMovie(res.data))
        .catch(err=>console.log(err))

    },[])

const  [value,setValue] =  useState(movie)

const mstars = [...movie.stars]


    const onChangeHandle= (evt)=>{
        const name = evt.target.name
        const changevalue = evt.target.value
        const id = evt.target.id

        if(name === 'stars'){
            mstars[id] = changevalue || movie.stars[id]
            console.log(mstars)
            
        }else{
            setValue({...movie,[name]:changevalue})
        }
    }

    const onSubmitHandle = evt=>{
        evt.preventDefault()
        
        setValue({...value,stars : mstars})

        console.log(value)
        

        
        axios.put(`http://localhost:5000/api/movies/${id}`,value)
        .then(res=>{console.log(res)
            getMovieList()
            push('/')
        }
        
        )
        .catch(err=>console.log(err))
    }
    const deleteItem = evt=>{
        axios.delete(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            getMovieList()
            push('/')
        })
    }
    return (

        <form onSubmit={onSubmitHandle}>
            <input type='text' onChange={onChangeHandle} name='title' placeholder={`Title :${movie.title}`} />
            <input type='text' onChange={onChangeHandle} name='director' placeholder={`Director: ${movie.director}`}/>
            <input type='text' onChange={onChangeHandle} name='metascore'placeholder={`Metascore: ${movie.metascore}`} />
           {movie.stars.map((star,index)=>{
               return <input type='text' key={index} id={index} onChange={onChangeHandle} name='stars'placeholder={star}/>
           })}
            <button onClick={onSubmitHandle}>send</button>
            <button onClick={deleteItem}>delete</button>
        </form>
    )
}
