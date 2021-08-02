import React, {useState, useEffect} from 'react';
import './Form.css';
import loading from './loading.png';

function ConvertForm(props) {

    const [error, setError] = useState(null);
    const [rate, setRate] = useState(0.00);
    const [currencies, setCurrencies] = useState([]);
    const [curAmount, setAmount] = useState(1)
    const [firstCurrency, setFirstCurrencyValue] = useState("AUD");
    const [secondCurrency, setSecondCurrencyValue] = useState("AUD");

    const currencyURL = `https://api.frankfurter.app/currencies`;

    useEffect(() => {
        fetch(currencyURL)
        .then(res => res.json())
        .then(
        (result) => {
            setCurrencies(Object.entries(result));
        },
        (error) => {
            setError(error);
        }
        )
    }) 


    function handleChange(e){
        setRate(0);
        if(e.target.name === "amount"){
            setAmount(e.target.value);
        }else if(e.target.name === "fst"){
          setFirstCurrencyValue(e.target.value);
        }else{
          setSecondCurrencyValue(e.target.value);
        }
      }

    let fstCur =firstCurrency;
    let sndCur = secondCurrency;
    let amount = curAmount;

    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fstCur}&to=${sndCur}`;

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            let exRate = Object.values(data.rates)
            setRate(exRate[0])
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    return (
        <div className="converterDisplay">
        <h1>Currency Converter</h1>
        <br/>
        <form className="convertForm" onSubmit={submitHandler}>
            <h2>{rate} {sndCur}</h2>

            <label>
                Amount
            </label>
                <input onChange={handleChange} name="amount" type="text"></input>
            
            <label>
                FROM
            </label>
            <select onChange={handleChange} name="fst">
                {currencies.map(([key, cur]) => (
                    <option key={key} value={key}>{cur} | {key}</option>
                ))}
            </select>

            <label>
                TO
            </label>
            <select onChange={handleChange} name="snd">
                {currencies.map(([key, cur]) => (
                    <option key={key} value={key}>{cur} | {key}</option>
                ))}
            </select>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default ConvertForm;


