import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user;
  public product;
  public listProducts:Array<Product>;
  constructor(private masterService: MasterService) {
    this.user = new User();
    this.product = new Product();
    let item = sessionStorage.getItem('stone').split('.');
    this.user = JSON.parse(atob(item[1]));
  }

  ngOnInit() {
    this.getProducts();
  }
  Submit() {
    this.masterService.post('http://localhost:3000/createProduct', this.product).subscribe(resp => {
      console.log(resp);
      this.product=new Product();
      this.getProducts();
    }, error => {
      console.log(error);
    });
  }
  getProducts(){
    this.masterService.get('http://localhost:3000/getProducts').subscribe(resp => {
      console.log(resp);
      this.listProducts=resp.listProducts;
    }, error => {
      console.log(error);
    });
  }

}
