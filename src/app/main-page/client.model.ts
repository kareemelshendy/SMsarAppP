export class Clients {

   
    public _id:string

    public name: string;
    public nationalId: string;
    public quotaValue: string;
    public taxCardNumber: string;
    public insuranceNumber: string;
    public address: string;
    public phoneNumber: string;
    public commericalRecord: string;
    public addressOfCommericalRecord:string
    public nationaIdImage: File;
    public taxCardImage: string;
    public insuranceImage: string;
    public commericalRecordImage: string;

    constructor(name: string, nationalId: string, phoneNumber: string, address: string,
        taxCardNumber: string, quotaValue: string, commericalRecord: string, insuranceNumber: string,
        addressOfCommericalRecord:string
        // commericalRecordImage:string,insuranceImage:string,taxCardImage:string,nationaIdImage:string
         ) {
        this.name = name;
        this.nationalId = nationalId;
        this.quotaValue = quotaValue;
        this.taxCardNumber = taxCardNumber;
        this.insuranceNumber = insuranceNumber;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.commericalRecord = commericalRecord;
        this.addressOfCommericalRecord=addressOfCommericalRecord;
        // this.nationaIdImage = nationaIdImage
        

    }
}