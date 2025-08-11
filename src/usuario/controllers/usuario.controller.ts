import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt_auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";
import { ParseIntPipe } from "@nestjs/common";

@ApiTags('Usuario')
@Controller("/usuarios")
@ApiBearerAuth()
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario);
    }

}

function Param(arg0: string, ParseIntPipe: any): (target: UsuarioController, propertyKey: "findById", parameterIndex: 0) => void {
    throw new Error("Function not implemented.");
}
