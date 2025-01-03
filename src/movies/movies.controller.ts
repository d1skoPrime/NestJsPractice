import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { MovieData } from './entities/movie.entity'
import { MoviesService } from './movies.service'

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService){}

	@Get()
	getAll(): MovieData[]{
		return this.moviesService.getAll()
	}
	@Get('search')
		search(@Query('year') searchYear:string){
			return `We are looking for movie that was released after ${searchYear} year`

	}
	@Get(':id')
	getOne(@Param('id') movieId:string): MovieData{
		return this.moviesService.getOne(movieId)
	}

	@Post()
	create(@Body() movieData){
		return this.moviesService.create(movieData)
	}

	@Delete(":id")
	remove(@Param("id") movieId:string, ){
		return this.moviesService.remove(movieId)
	}

	@Patch(':id')
	update(@Param('id') movieId:string, @Body() updatedData){
		return this.moviesService.patch(movieId, updatedData)
		
	}
	
}
