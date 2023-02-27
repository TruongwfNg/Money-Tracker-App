import { useEffect, useState } from "react";

function App() {
  const URL = process.env.REACT_APP_API_URL;
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  // Show all Item When start up the app
  useEffect(() => {
    fetch(URL + "/getAllTransactions").then((response) => {
      response.json().then((data) => {
        setTransactions(data);
      });
    });
  }, []);
  //
  console.log(name);
  const addNewTransaction = (e) => {
    e.preventDefault();

    const price = name.split(" ")[0];

    fetch(URL + "/transaction", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price,
        datetime,
        description,
      }),
    })
      .then((response) => {
        response.json();
      })
      .then((res) => {
        window.location.reload(true);
        setName("");
        setDescription("");
        setDatetime("");
      });
  };

  let balance = 0;
  for (const transaction of transactions) {
    balance += transaction.price;
  }
  //
  return (
    <main>
      <h1>
        ${balance}
        <span>.00</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={"+200 new Macbook"}
          />
          <input
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder={"description"}
          />
        </div>

        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((trans) => {
            return (
              <div key={trans._id} className="transaction">
                <div className="left">
                  <div className="name">{trans.name}</div>
                  <div className="description">{trans.description}</div>
                </div>
                <div className="right">
                  <div
                    className={"price " + (trans.price < 0 ? "red" : "green")}
                  >
                    {trans.price} $
                  </div>
                  <div className="datetime">${trans.datetime}</div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}

export default App;
