import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignInUserDto } from 'src/user/dto/signin-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async registerUser(dto: CreateUserDto) {
    return this.userService.create(dto)
  }

  async signIn(dto: SignInUserDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) throw new UnauthorizedException()

    const isMatch = await compare(dto.password, user.password)
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
