export class PaymentDetail {
  id: number;
  customerName: string;
  dateEntered: Date;
  enteredBy: string;
  voucherDescription: string;
  amount: number;
  custCode: string;
  served: boolean;
  dateserved: Date;
  servedby: string;
  custtypeid: number;
  voucherid: number;
  paymentmodeid: number

constructor() {
    this.id = 0;
    this.customerName = "";
    this.dateEntered=new Date();
    this.enteredBy="";
    this.voucherDescription="";
    this.amount=0.0;
    this.custCode="";
    this.served=false;
    this.dateserved=new Date();
    this.servedby="";
    this.custtypeid=0;
    this.voucherid=0;
    this.paymentmodeid=0;
  }
}
