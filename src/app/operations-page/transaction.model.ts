import { Clients } from "../main-page/client.model";
import { Dealer } from "./dealer.model";

export class Transactions {
    public _id:string;
    public client:Clients;
    // public dealer:Dealer
    public nationalId: string;
    public purchaseCash: number;
    public purchaseDate: Date;
    public isExtracted: boolean;
    public paperSentToClient: boolean;
    public relasePaperDate: Date;
    public sentPaperDate: Date;
    public sellCash: number;
    public sellDate: Date;    
    public phoneNumber:string;
    public dealerName: string;
    public productType: string;
    public paper:any

    constructor(client:Clients ,nationalId: string, purchaseCash: number, purchaseDate: Date, isExtracted: boolean,
        paperSentToClient: boolean, relasePaperDate: Date, sentPaperDate: Date, sellCash: number, sellDate: Date,
        dealerName: string,phoneNumber:string, productType: string , paper:any) {
        this.client=client,
        this.nationalId = nationalId;
        this.purchaseCash = purchaseCash;
        this.purchaseDate = purchaseDate;
        this.isExtracted = isExtracted;
        this.paperSentToClient = paperSentToClient;
        this.relasePaperDate = relasePaperDate;
        this.sentPaperDate = sentPaperDate;
        this.sellCash = sellCash;
        this.sellDate = sellDate;
        this.dealerName = dealerName;
        this.phoneNumber=phoneNumber
        this.productType = productType;
            this.paper = paper
    }
}