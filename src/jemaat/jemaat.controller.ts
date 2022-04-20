import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JemaatService } from './jemaat.service';
import { CreateJemaatDto } from './dto/create-jemaat.dto';
import { UpdateJemaatDto } from './dto/update-jemaat.dto';
import { PageOptionsDto } from './dto/pageOptions.dto';

@Controller('jemaat')
export class JemaatController {
  constructor(private readonly jemaatService: JemaatService) {}

  @Post()
  async create(@Body() createJemaatDto: CreateJemaatDto) {
    return await this.jemaatService.createJemaat(createJemaatDto);
  }

  @Get()
  findAll(@Query() pageOptions: PageOptionsDto) {
    console.log(pageOptions);
    return this.jemaatService.getJemaat(pageOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jemaatService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJemaatDto: UpdateJemaatDto) {
    return this.jemaatService.update(id, updateJemaatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jemaatService.remove(id);
  }
}
