export const generateLineData = (transactions) => {
  //   console.log(2000, transactions);

  //   [
  //   {
  //     _id: new ObjectId('69acc060a2a87e3f97f2f16a'),
  //     type: 'expense',
  //     amount: 100,
  //     tDate: 2025-02-25T00:00:00.000Z,
  //     description: 'salary',
  //     userId: new ObjectId('69acc03da2a87e3f97f2f165'),
  //     __v: 0
  //   },
  //   {
  //     _id: new ObjectId('69acc065a2a87e3f97f2f16d'),
  //     type: 'expense',
  //     amount: 300,
  //     tDate: 2025-02-25T00:00:00.000Z,
  //     description: 'salary',
  //     userId: new ObjectId('69acc03da2a87e3f97f2f165'),
  //     __v: 0
  //   },
  //   {
  //     _id: new ObjectId('69acc06ca2a87e3f97f2f170'),
  //     type: 'income',
  //     amount: 5000,
  //     tDate: 2025-02-25T00:00:00.000Z,
  //     description: 'salary',
  //     userId: new ObjectId('69acc03da2a87e3f97f2f165'),
  //     __v: 0
  //   }
  // ]

  //   [
  //     { name: "Jan", income: 4000, expense: 2400 },
  //     { name: "Feb", income: 3000, expense: 1398 },
  //     { name: "Mar", income: 2000, expense: 500 },
  //     { name: "Apr", income: 2780, expense: 3908 },
  //     { name: "May", income: 1890, expense: 4800 },
  //     { name: "Jun", income: 2390, expense: 3800 },
  //   ]

  let sortedTransaction = transactions.sort((a, b) => {
    return a.tDate - b.tDate;
  });

  let outputData = [];

  for (let tx of sortedTransaction) {
    const date = new Date(tx.tDate);
    const monthNameShort = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);

    let oldData = outputData.find((item) => item.name === monthNameShort);

    if (oldData) {
      if (tx.type === "income") {
        oldData.income += tx.amount;
      } else {
        oldData.expense += tx.amount;
      }
    } else {
      let newObject = {
        name: monthNameShort,
        income: tx.type === "income" ? tx.amount : 0,
        expense: tx.type === "expense" ? tx.amount : 0,
      };
      outputData.push(newObject);
    }
  }

  return outputData;
};
