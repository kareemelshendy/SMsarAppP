import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";
import { DataStorageService } from "../shared/data-storage.service";
import { Total } from "./dashboard.model";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @ViewChild("dashboardform", { static: false }) dashboardform: NgForm;
  total: any;

  dbform: FormGroup;
  isloading = false;
  constructor(
    private dashboardservice: DashboardService,
    private dataStoraceService: DataStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isloading = true
    this.dataStoraceService.fetchTotal().subscribe((res) => {
      console.log(res)
      this.initForm(res);
      this.isloading = false
    });
  }

  private initForm(res) {
    let clients = "";
    let dealers = "";
    let profit = "";
    let qoutaNumber = "";
    let totalIncome = "";
    let totlaOutcome = "";
    let transactions = "";

    const total = res;
    clients = total.clients;
    dealers = total.dealers;
    profit = total.profit;
    qoutaNumber = total.qoutaNumber;
    totalIncome = total.totalIncome;
    totlaOutcome = total.totlaOutcome;
    transactions = total.transactions;

    this.dbform = this.fb.group({
      clients: [clients],
      dealers: [dealers],
      profit: [profit],
      qoutaNumber: [qoutaNumber],
      totalIncome: [totalIncome],
      totlaOutcome: [totlaOutcome],
      transactions: [transactions],
    });
  }
}
