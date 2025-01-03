import { Injectable, NotFoundException } from '@nestjs/common'
import { MovieData } from './entities/movie.entity'

@Injectable()
export class MoviesService {
	private movies: MovieData[] = []

	getAll(): MovieData[]{
		return this.movies
	}

	getOne(movieId:string): MovieData{
		const movie =  this.movies.find((movie) => movie.id === +movieId)
		if(!movie){
			throw new NotFoundException(`'We could not find movie with id: ${movieId}. `)
		}
		return movie
	}
	remove(movieId:string){
		const movie = this.getOne(movieId)
		this.movies = this.movies.filter((movie) => movie.id !== +movieId)
		return {
			message: `The movie with id: ${movie.id} was removed`,
		}
	}
	create(movieData){
		const newMovie = {
			id:this.movies.length + 1,
			...movieData
		}
		const newMovieId = newMovie.id

		this.movies.push(newMovie)

		return {
			message: `Succes! Movie was created with id: ${newMovie.id}`,
			id: newMovie.id,
		}
			
		
	}
	patch(id:string, updatedData){
		const movie = this.getOne(id)
		this.remove(id)
		this.movies.push({...movie, ...updatedData})
		return {message: `Movie was successfully updated. New title is ${updatedData.title} `}
	}
}
