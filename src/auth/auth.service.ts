import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly users: any[] = [];

  constructor(private readonly jwtService: JwtService) {}

  registerUser(username: string, password: string): string {
    const user = this.getUserByUsername(username);

    if (user) {
      return 'Username already exists. Please choose a different username.';
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const userDetail = {
      id: this.users.length + 1,
      username,
      password: hashedPassword,
    };

    this.users.push(userDetail);

    return 'user has been created successfully';
  }

  loginUser(username: string, password: string): string {
    const user = this.users.find((u) => u.username === username);

    if (!user || !compareSync(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.sign({ username: user.username });

    return token;
  }

  getUserByUsername(username: string): any {
    return this.users.find((user) => user.username === username);
  }
}
