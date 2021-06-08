import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Transactions } from "../transaction.model";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-operation-detail",
  templateUrl: "./operation-detail.component.html",
  styleUrls: ["./operation-detail.component.scss"],
})
export class OperationDetailComponent implements OnInit {
  transactions: Transactions[];
  pager = {};
  pageOfItems = [];
  searchValue = ''
  constructor(
    private dataStorageService: DataStorageService,
    private transactionService: TransactionService,
    private __http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.dataStorageService.fetchtTransaction().subscribe(res=>{
    //   this.transactionService.SetTransaction(res);
    //   console.log(res)

    // });
    
    // console.log(this.transactions);
    this.route.queryParams.subscribe((x) => {
      
      this.loadPage(x.page || 1);
    });
    this.transactions = this.transactionService.GetTransactions();
    this.transactionService.transactionChanged.subscribe(
      (transactions: Transactions[]) => {
        this.transactions = transactions;
        
      }
    );    
  }

  private loadPage(page) {
    // get page of items from api
    this.__http
      .get<any>(`https://clerk-new.herokuapp.com/transactions/?page=${page}&nationalId=${this.searchValue}`)
      .subscribe((x) => {
        this.pager = x;
        this.transactions = x.pageOfItems;
        this.transactionService.SetTransaction(x);
        console.log(x);
      });
  }
  onSearch(searchVlaue){
    // setTimeout(()=>{
    //   this.isLoading = true
    // },2000)
    
    this.router.navigate([`/operations`], {
      queryParams: {
        nationalId:searchVlaue
      },
    });
    // this.isLoading = false
  }
  onNavigate(page) {
    this.router.navigate([`/operations`], {
      queryParams: {
        page: page,
      },
    });
  }

  onDelete(i) {
    if (confirm("are you sure to delete?")) {
      let _id = this.transactionService.GetTransaction(i)._id;
      console.log(i);
      this.dataStorageService.deletetTransaction(_id);
    }
    this.transactionService.deleteTransaction(i);
  }

  onShow(i) {
    this.transactionService.startShow.next(i);
  }
}
