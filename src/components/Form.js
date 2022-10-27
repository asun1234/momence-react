import React from 'react';
import {Form, Button, ButtonGroup, Card, Dropdown, DropdownButton} from 'react-bootstrap';

export default class BaseForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          amount: 0,
          conversionRates: [],
          conversionRate: 0,
          convertedAmount: 0,
          currCodeIndex: 0,
          dropdownDivs:[],
          finalCardText: '',
          selectedCurrencyCode: 'Currency Code',
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        if(localStorage.getItem("currencyCodes") == null) return;
        const currCodes = JSON.parse(localStorage.getItem("currencyCodes"));
        let divs = [];
        currCodes.forEach((code, i) => {
          if(i !== 0) divs.push(<Dropdown.Divider />)

          divs.push(<Dropdown.Item eventKey={i} key={i}>{code}</Dropdown.Item>)
        });
        this.setState({dropdownDivs: divs});
        this.setState({conversionRates: JSON.parse(localStorage.getItem("conversionRates"))});
      }

      handleChangeInput(event) {
        this.setState({amount: event.target.value});
      }

      handleSelect(event) {
        let codes = JSON.parse(localStorage.getItem("currencyCodes"))
        this.setState({selectedCurrencyCode: codes[event]});

        let conversionRateStr = this.state.conversionRates[event];

        this.setState({conversionRate: parseFloat(conversionRateStr)});
        event.preventDefault();
      }

      handleSubmit(event) {
        // use conversion rate to get new value
        this.setState({convertedAmount: (this.state.amount / this.state.conversionRate).toFixed(2)});
        event.preventDefault();
      }

      render() {
        return (
          <div class="App">
          <Card >
            <Card.Body>
              <Card.Title>Convert CZK to Currency of Choice:</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Make conversion selection below:</Card.Subtitle>
              <Form onSubmit={this.handleSubmit}>
                <label>
                  <input placeholder="Amount to convert" type="number" min="1" onChange={this.handleChangeInput.bind(this)} />
                </label>
                <ButtonGroup>
                <DropdownButton variant = "tertiary" title= {this.state.selectedCurrencyCode}
                onSelect={this.handleSelect.bind(this)} >
                  {this.state.dropdownDivs}
                </DropdownButton>
                <Button variant = "tertiary" type="submit">Submit</Button>
                </ButtonGroup>
              </Form>
            </Card.Body>
          </Card>
          <br/>
            <Card>
              <Card.Body>
                <Card.Title>Converted Amount</Card.Title>
                <div>
              {(this.state.amount !== 0 && this.state.selectedCurrencyCode !==  'Currency Code') ?
                <Card.Subtitle className="mb-2 text-muted">
                  CZK Amount: {this.state.amount} to Currency Code: {this.state.selectedCurrencyCode}
                </Card.Subtitle>
                : <Card.Subtitle className="mb-2 text-muted"> Converted CZK amount will show here.</Card.Subtitle>
              }
               {(this.state.conversionRate !== 0  && this.state.convertedAmount !== 0)
                 && <Card.Text >
                  Converted Amount ({this.state.selectedCurrencyCode}): {this.state.convertedAmount}
                 </Card.Text>}
                 </div>
              </Card.Body>
            </Card>
          </div>
        );
      }
}
