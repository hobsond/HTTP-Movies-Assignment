import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
export default function UpdateMovie() {
    const id = useParams().id
    console.log(id)
    const [movie,setMovie]= useState()
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>setMovie(res.data))
    },[])
    console.log(movie)
    return (

        <div>
            
        </div>
    )
}
