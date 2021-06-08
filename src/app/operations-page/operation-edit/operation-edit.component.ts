import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Clients } from "src/app/main-page/client.model";
import { ClientsService } from "src/app/main-page/client.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Transactions } from "../transaction.model";
import { TransactionService } from "../transaction.service";

@Component({
  selector: "app-operation-edit",
  templateUrl: "./operation-edit.component.html",
  styleUrls: ["./operation-edit.component.scss"],
})
export class OperationEditComponent implements OnInit, OnDestroy {
  @ViewChild("operationForm", { static: false }) operationForm: NgForm;
  transactionForm = new FormGroup({});
  id: number;
  _id;
  // sellDate;
  editedItemIndex;
  showedTransaction: Transactions;
  showMode = false;
  client: Clients;

  showedClient: Clients;
  name: string = "";
  nationalId: string = "";
  quotaValue: string = "";
  subscription: Subscription;
  isLoading = false;
  paperUrl = "";
  alert: boolean = false;
  alertDanger: boolean = false;
  errorMessage=''
  fileData = null;

  constructor(
    private transactionService: TransactionService,
    private clientServic: ClientsService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,

    private router: Router
  ) {}

  ngOnInit() {
    // this.dataStorageService.fetchClient();

    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      this.showedClient = this.clientServic.getClient(this.id);
      if (this.showedClient) {
        this.name = this.showedClient.name;
        this.nationalId = this.showedClient.nationalId;
        this.quotaValue = this.showedClient.quotaValue;
      }
    });

    // Show Selected Item in Form
    this.subscription = this.transactionService.startShow.subscribe(
      (index: number) => {
        this.showMode = true;

        this.showedTransaction = this.transactionService.GetTransaction(index);
        if (this.showMode) {
          this.client = this.showedTransaction.client;
          this.nationalId = this.showedTransaction.client.nationalId;
        }
        this.quotaValue = this.client.quotaValue;
        this.name = this.client.name;
        this.editedItemIndex = index;
        this._id = this.transactionService.GetTransaction(index)._id;

        console.log(this.showedTransaction);
        console.log("ID: " + this.showedTransaction._id);
        this.paperUrl = this.showedTransaction.paper
        this.operationForm.setValue({
          purchaseCash: this.showedTransaction.purchaseCash,
          purchaseDate: this.showedTransaction.purchaseDate,
          isExtracted: this.showedTransaction.isExtracted,
          paperSentToClient: this.showedTransaction.paperSentToClient,
          relasePaperDate: this.showedTransaction.relasePaperDate,
          sentPaperDate: this.showedTransaction.sentPaperDate,
          sellCash: this.showedTransaction.sellCash,
          sellDate:  this.showedTransaction.sellDate ,
          dealerName: this.showedTransaction.dealerName,
          phoneNumber: this.showedTransaction.phoneNumber,
          productType: this.showedTransaction.productType,
          paper:''
        });
      }
    );
    this.showMode = false;
    console.log("ShowMode: " + this.showMode);

    // this.transactionForm = new FormGroup({
    //   purchaseCash: new FormControl([]),
    //   purchaseDate: new FormControl(),
    //   isExtracted: new FormControl(),
    //   paperSentToClient: new FormControl(),
    //   relasePaperDate: new FormControl(),
    //   sentPaperDate: new FormControl(),
    //   sellCash: new FormControl(),
    //   sellDate: new FormControl(),
    //   dealerName: new FormControl(),
    //   phoneNumber: new FormControl(),
    //   productType: new FormControl(),
    //   paper: new FormControl(),
    // });
  }

  // select uploaded image and perview it
  onSelect(event) {
    this.fileData = <File>event.target.files[0];
    console.log(this.fileData);
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    // prepare frmData for upload image and send formData to the sever after append all req body to formData
    const formData = new FormData();
    formData.append("nationalId", this.nationalId);
    formData.append("purchaseCash", form.value.purchaseCash);
    formData.append("purchaseDate", form.value.purchaseDate);
    formData.append("isExtracted", form.value.isExtracted);
    formData.append("paperSentToClient", form.value.paperSentToClient);
    formData.append("relasePaperDate", form.value.relasePaperDate);
    formData.append("sentPaperDate", form.value.sentPaperDate);
    formData.append("sellCash", form.value.sellCash);
    formData.append("sellDate", form.value.sellDate);
    formData.append("dealerName", form.value.dealerName);
    formData.append("phoneNumber", form.value.phoneNumber);
    formData.append("productType", form.value.productType);
    formData.append("paper", this.fileData, this.fileData.name);
    if (!this.showMode) {
      const newTransaction = new Transactions(
        this.clientServic.getClient(this.id),
        this.nationalId,
        form.value.purchaseCash,
        form.value.purchaseDate,
        form.value.isExtracted,
        form.value.paperSentToClient,
        form.value.relasePaperDate,
        form.value.sentPaperDate,
        form.value.sellCash,
        form.value.sellDate,
        form.value.dealerName,
        form.value.phoneNumber,
        form.value.productType,
        form.value.paper
      );
      console.log(newTransaction);
      //
      this.dataStorageService.storeTransaction(formData).subscribe(
        (res) => {
          if (res) {
            this.isLoading = false;
            console.log(res);
            this.alert = true
            document.documentElement.scrollTop = 0; 
          }
        },
        (err) => {
          if (err) {
            this.isLoading = false;
            this.alertDanger = true
            document.documentElement.scrollTop = 0; 
          }
          this.errorMessage = err.error.message
        }
      );

      // push newTransaction to the Trasnactions array
      this.transactionService.AddTransaction(newTransaction);
    } else {
      const newTransaction = new Transactions(
        this.client,
        this.nationalId,
        form.value.purchaseCash,
        form.value.purchaseDate,
        form.value.isExtracted,
        form.value.paperSentToClient,
        form.value.relasePaperDate,
        form.value.sentPaperDate,
        form.value.sellCash,
        form.value.sellDate,
        form.value.dealerName,
        form.value.phoneNumber,
        form.value.productType,
        form.value.paper
      );
      // this.transactionService.updateTransaction(
      //   this.editedItemIndex,
      //   newTransaction
      // );
      // this.dataStorageService.updateTransaction(this._id, newTransaction);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }
    this.showMode = false;
    console.log("ShowMode: " + this.showMode);
    // form.reset();
    this.operationForm.reset();
  }

  closeAlert() {
    this.alert = false;
  }
  closeAlertDanger() {
    this.alertDanger = false;
  }
  onPrint() {
    window.print();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
