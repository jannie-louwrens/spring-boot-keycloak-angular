import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { OrderService } from './order.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Order[] = [];
  private total = new BehaviorSubject<number>(0);

  constructor(private orderService: OrderService) { }

  get total$(){
    return this.total.asObservable();
  }

  addItem(item: any) {
    this.items.push(item);
    this.total.next(this.items.length);
  }

  loadItemsForUser(username: string) {
    this.orderService.getOrdersByCustomer(username).pipe(
      tap((orders: Order[]) => {
        this.items = orders;
        this.total.next(this.items.length);
      }, error => {
        console.log(error);
      })
    ).subscribe();
  }

}
