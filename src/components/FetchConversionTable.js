import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from 'react-bootstrap';

class FetchConversionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          tableDivs: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
      }

    componentDidMount() {
      // To clear the whole data stored in localStorage
    localStorage.clear();
    // Simple GET request using fetch
    // round conversion rate to 2 decimal places
    const serverUrl = 'http://localhost:3001/fetchConversionData';
    fetch(serverUrl, {method: "GET"})
        .then(response => response.json())
        .then(rows =>{
            const tableRows = rows.map((row, i) => {
            return (<tr key={i+1}>
              <td>{i+1}</td>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
              <td>{parseFloat(row[4])}</td>
              </tr>)
            })
            this.setState({tableDivs: tableRows})

            // store currency codes in local storage
            const currencyCodes = rows.map((row, i) => {
              return(row[3])
            })
            localStorage.setItem("currencyCodes", JSON.stringify(currencyCodes))

            // store conversion rates in local storage
            const conversionRatesInCZK = rows.map((row, i) => {
              let conversionRateInCZK =
              parseFloat(row[4]/parseFloat(row[2]));
              return(conversionRateInCZK)
            })
            localStorage.setItem("conversionRates",
            JSON.stringify(conversionRatesInCZK))
        }
        ).catch((error) => {
          console.error(error)
        });
      }

    render() {
        return (
          <div id="results">
            <h3>Foreign Exchange Market Rates:</h3>
            <Table striped bordered hover size="md">
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Country</th>
                  <th>Currency</th>
                  <th>Amount (non-CZK)</th>
                  <th>Code</th>
                  <th>Rate (CZK)</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableDivs}
              </tbody>
            </Table>
          </div>
        );
      }
}
export default FetchConversionTable;
