import React,{useState, useEffect} from "react";



const Calculator = () =>{
    //User Input Data  
    const [userData, setuserData] = useState ( { 
        principal:"",
        rate:"",
        time:"",
        downpayment:"",
          })

    //Calculated Data
    const [calcData, setcalcData] = useState ( { 
        amount:0,
        interest:0,
        months:0,
        result:""
        })

    const resultCalc=(calc) =>{
          
          const x= Math.pow(1 + parseFloat(calc.interest), calc.months)
          const sum=(calc.amount * parseFloat(calc.interest) * x) / (x - 1);
          
          setcalcData( prevState=> ( {...prevState , result:parseInt(sum)}));
          
    }

    useEffect((calcData)=>{resultCalc(calcData)}, [calcData.interest])

    
    //Handle Change and Calculate Interest and Months
    const handleOnChange = (event) => {

      setuserData( prevState=> ( {...prevState , [event.target.className] : event.target.value}))

      if(event.target.className==="downpayment"){
        setuserData( prevState=> ( {...prevState , [event.target.className] : event.target.value}))
        let totalAmount=Number(userData.principal-event.target.value);
        setcalcData( prevState=> ( {...prevState , amount:totalAmount}))
        //console.log("Amount"+totalAmount,","+[calcData.amount])
      }
      if(event.target.className==="time"){
        setuserData( prevState=> ( {...prevState , [event.target.className] : event.target.value}))
        let yearsToMonths=Number(event.target.value*12);
        setcalcData( prevState=> ( {...prevState , months:yearsToMonths}))
        //console.log("Months"+yearsToMonths,","+ calcData.months)
      }
        if(event.target.className==="rate"){
          setuserData( prevState=> ( {...prevState , [event.target.className] : event.target.value}))
          let monthlyRate=Number(event.target.value/100/12).toFixed(5);
          setcalcData( prevState=> ( {...prevState , interest:monthlyRate}))
          //console.log("Rate"+monthlyRate,","+ calcData.interest)
          //resultCalc(calcData)
        }
        
    }  

    return (
        <div className="App">
          <div className="main-block">
            <div className='app-block'>
              <header className="App-header">
              Mortgage Calculator
              </header>
            
            <div className="inputs">
              <div className="container1">
              <div className="text">
                <label>Property Value</label><br/>
                <input className='principal' onChange={handleOnChange} placeholder="Enter Value" value={userData.principal}/>
                
              </div>
              <div className="text">
                <label>Downpayment</label><br/>
                <input className='downpayment' onChange={handleOnChange} placeholder="Enter Value" value={userData.downpayment}/>
                
              </div>
              <div className="text">
                <label>Term Period</label><br/>
                <input className='time' onChange={handleOnChange} placeholder="Enter Value" value={userData.time}/>
                
              </div>
              <div className="text">
                <label>Interest Rate</label><br/>
                <input className='rate' onChange={handleOnChange} placeholder="Enter Value" value={userData.rate}/>
              </div>  
              </div>

              <div className="resultContainer">
                <div className="container2">
                <label className="payments">Monthly Payments</label><br/>
                <p className="result">$ {parseInt(calcData.result)}</p>
                
                </div>
              </div>
              </div>
    
            </div>
          </div>
        </div>
      );
}


export default Calculator;