export class Users {
//    public lock :boolean;
//    public try: number;
   public _id:string;
   public name :string;
   public password: string;
   public role : string;

    constructor(name:string,password:string,role:string){
        this.name = name,
        this.password = password,
        this.role= role;
    }
}