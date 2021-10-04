import { CircularProgress } from "@mui/material";
import React from "react";

import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { PricingData } from "../backend/backendinterface";

import backend from "../backend/backend";

interface PState {
  prices: PricingData[];
  failed: boolean;
}

class PricingPage extends React.Component<RouteComponentProps, PState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      prices: [],
      failed: false,
    };
  }

  // Lifecycle function for after the Component has rendered
  // We load the airspaces after
  componentDidMount(): void {
    this.loadPrices();
  }

  // Retrieve the airspace list from the backend, and process for display
  loadPrices(): void {
    const prices = backend.getPrices();
    this.setState({ prices });
  }

  slotClick = () => {
    this.props.history.push("/booking");
  };
  pkgClick = () => {
    this.props.history.push("/contact");
  };

  getPricingRows = () => {
    const { prices } = this.state;

    let tableRows: JSX.Element[] = [<CircularProgress key={"prog" + 1} />];

    if (prices.length !== 0) {
      tableRows = prices.map((price) => {
        return (
          <PricingSlot
            key={price.title + Math.random() * 1000}
            onClick={price.booking ? this.slotClick : this.pkgClick}
            title={price.title}
            priceText={price.price}
            buttonText={price.booking ? "Book Now" : "Contact"}
          >
            {price.options.num_images && (
              <PricingDetail>
                <b>{price.options.num_images}</b> digital images
              </PricingDetail>
            )}
            {price.options.print_rel && (
              <PricingDetail>
                <b>{price.options.print_rel}</b> print release
              </PricingDetail>
            )}
            {price.options.custom_txt &&
              price.options.custom_txt.map((txt) => {
                return (
                  <PricingDetail key={price.title + "custom" + txt}>
                    {txt}
                  </PricingDetail>
                );
              })}
          </PricingSlot>
        );
      });
    }
    return tableRows;
  };

  render() {
    return (
      <div className="page-content">
        <div className="page-header">Pricing</div>
        <PricingTable highlightColor="#87059c">
          {this.getPricingRows()}
        </PricingTable>
      </div>
    );
  }
}

export default withRouter(PricingPage);
