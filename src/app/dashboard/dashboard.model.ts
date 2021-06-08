export class Total {
  public clients: number;
  public dealers: number;
  public profit: number;
  public qoutaNumber: number;
  public totalIncome: number;
  public totlaOutcome: number;
  public transactions: number;

  constructor(
    clients: number,
    dealers: number,
    profit: number,
    qoutaNumber: number,
    totalIncome: number,
    totlaOutcome: number,
    transactions: number
  ) {
    (this.clients = clients),
      (this.dealers = dealers),
      (this.profit = profit),
      (this.qoutaNumber = qoutaNumber),
      (this.totalIncome = totalIncome),
      (this.totlaOutcome = totlaOutcome),
      (this.transactions = transactions);
  }
}
