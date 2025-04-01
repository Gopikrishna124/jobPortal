import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchJobHomePage } from '@/redux/jobSlice'

function CategoryCarousel() {
    const category=[
        "Frontend Developer",
        "Backend Developer",
        "Data Scientist",
        "Cloud Engineer",
        "FullStack Developer"
    ]
    const dispatch=useDispatch()
    const  navigate=useNavigate()
//................................................................

     const handleSearch=async(item)=>{
           dispatch(setSearchJobHomePage(item))
           navigate('/browse')
       }
  return (
    <div>
        <Carousel className='w-full max-w-xl mx-auto'>
             <CarouselContent>
              {
                category.map((item,index)=>(
                    <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                       <Button  className='min-w-[150px]' onClick={()=>handleSearch(item)}>{item}</Button>
                    </CarouselItem>
                ))
              }
              </CarouselContent>
              <CarouselPrevious/>
               <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel