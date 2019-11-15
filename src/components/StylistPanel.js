import React, { Component } from "react";
import { Container, Button } from "./common";
import OrderInfoStatus from "./OrderInfoStatus";
import "../styles/Panel.scss";
import dummyData from "../services/dummydata";
import cerseiSide from "../assets/cersei-side.jpg";
import cerseiFront from "../assets/cersei-front.jpg";

export default class StylistPanel extends Component {
  construct(props) {
    this.state = {
      data: "",
      initialItems: [],
      items: []
    };
  }

  async componentDidMount() {
    await this.setState({
      data: dummyData
    });
    // console.log(this.state.data);
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleSelect = event => {
    this.setState({
      value: event.target.value
    });
    setTimeout(() => {
      console.log(this.state.value);
    }, 500);
  };

  filterList = event => {
    let items = this.state.initialItems;
    items = items.filter(item => {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: items });
  };

  render() {
    return (
      <div className="dashboard">
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* <form>
            <span>Search:</span>
            <input
              type="text"
              placeholder="Search"
              // onChange={this.handleChange}
            />
          </form> */}
        </div>

        <OrderInfoStatus />

        <Container classname="section-2">
          <div className="selfie">
            <h3 className="column-name">SELFIE</h3>
            <div style={{ marginBottom: `${10}px` }}>
              {/* insert images */}
              <img src={cerseiSide} />
              <img src={cerseiFront} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: `${99}%`
            }}
          >
            <div className="skeleton">
              <h3 className="column-name">SKELETON</h3>

              <div className="skeleton-content">
                <div className="column">
                  <h3>Thickness</h3>
                  <p>Fine</p>
                </div>
                <div className="column">
                  <h3></h3>
                  <h3>Texture (User/Override)</h3>
                  <p>Curly/Kinky</p>
                </div>
                <div className="column">
                  <h3>Condition(s)</h3>
                  <p>Split ends, frequent heat-styling tools</p>
                </div>
                <div className="column">
                  <h3>Goal 1</h3>
                  <p>Damage repair, frizz control, hydrate</p>
                </div>
              </div>
            </div>

            <div className="skeleton">
              <h3 className="column-name">BOOSTERS</h3>

              <div className="skeleton-content">
                <div className="column">
                  <h3>Age</h3>
                  <p>20s</p>
                </div>

                <div className="column">
                  <h3></h3>
                  <h3>Diet</h3>
                  <p>Non-restricted</p>
                </div>

                <div className="column">
                  <h3>Zip</h3>
                  <p>94109</p>
                </div>

                <div className="column">
                  <h3>Fragrance</h3>
                  <p>Energizing</p>
                </div>

                <div className="column">
                  <h3>Wash Frequency</h3>
                  <p>5x</p>
                </div>

                <div className="column">
                  <h3>Afterwash</h3>
                  <p>2</p>
                </div>

                <div className="column">
                  <h3>Goal 2</h3>
                  <p>Balance scalp, curl enhancing, thermal protection</p>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container classname="section-3">
          <div className="column-skeleton-fragrance">
            <h3 className="column-name">SKELETON</h3>
            <div className="box">
              <select onChange={this.handleSelect}>
                <option value="colorProtect">color protect</option>
                <option value="colorChange">color change</option>
              </select>
            </div>
          </div>

          <div className="column-skeleton-fragrance">
            <h3 className="column-name">FRAGRANCE</h3>
            <div className="box">
              <select onChange={this.handleSelect}>
                <option>energizing</option>
                <option>option 2</option>
              </select>
            </div>
          </div>

          <div className="column">
            <h3 className="column-name">BOOSTERS</h3>
            <div className="box">
              <select onChange={this.handleSelect}>
                <option>toning</option>
                <option>option 2</option>
              </select>
              <select onChange={this.handleSelect}>
                <option>moisture</option>
                <option>option 2</option>
              </select>
              <select onChange={this.handleSelect}>
                <option>blank</option>
                <option>option 2</option>
              </select>
              <select onChange={this.handleSelect}>
                <option>blank</option>
                <option>option 2</option>
              </select>
              <select onChange={this.handleSelect}>
                <option>blank</option>
                <option>option 2</option>
              </select>
            </div>
          </div>
          <div className="btn-container">
            <Button title="SAVE" />
            <Button type="submit" title="SUBMIT" />
          </div>
        </Container>
      </div>
    );
  }
}
