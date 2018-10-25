import { Component, OnInit } from '@angular/core';
import { MasterService } from '../services/master.service';
import bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user
  constructor(private masterservice:MasterService,private router:Router) {
    this.user=new User();
   }

  ngOnInit() {
  }
  Submit(){
    this.masterservice.post('http://localhost:3000/login',this.user).subscribe(resp=>{
      this.user=new User();
      sessionStorage.setItem("stone",resp.token);
      this.router.navigate(['/home']);
    },error=>{
      console.log('fallo');
    })
  }
}
