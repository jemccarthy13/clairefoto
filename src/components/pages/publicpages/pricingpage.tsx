import React from "react";

import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { PricingData } from "../../../backend/backendinterface";

import backend from "../../../backend/backend";
import { AuthContext } from "../../authcontext";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

interface PState {
  prices: PricingData[];
  failed: boolean;
  tmpTitle: string;
  loaded: boolean;
}

class PricingPage extends React.Component<RouteComponentProps, PState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      prices: [],
      failed: false,
      tmpTitle: "",
      loaded: false,
    };
  }

  // Lifecycle function for after the Component has rendered
  // We load the airspaces after
  componentDidMount(): void {
    this.loadPrices();
  }

  // Retrieve the airspace list from the backend, and process for display
  loadPrices(): void {
    backend.getPricing().then((data) => {
      data.forEach((d: any) => {
        d.options = JSON.parse(d.options);
        d.booking = d.booking === "1" ? true : false;
      });
      this.setState({ prices: data, loaded: true });
    });
  }

  slotClick = (title: string) => {
    return () => {
      this.props.history.push("/booking?type=" + title);
    };
  };

  pkgClick = () => {
    this.props.history.push("/contact");
  };

  getPricingRows = () => {
    const { prices } = this.state;

    let tableRows: JSX.Element[] = [
      <div key={prices.length + Math.random() * 1000}>Loading...</div>,
    ];

    if (prices.length !== 0) {
      tableRows = prices.map((price) => {
        return (
          <PricingSlot
            key={price.title + Math.random() * 1000}
            onClick={
              price.booking ? this.slotClick(price.title) : this.pkgClick
            }
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
    const { loaded } = this.state;
    return (
      <AuthContext.Consumer>
        {(value) => (
          <div className="page-content">
            {loaded && (
              <div>
                <div className="page-header">
                  Pricing{" "}
                  {value.auth && (
                    <IconButton
                      style={{ verticalAlign: "baseline" }}
                      component={Link}
                      to="/pricingedit"
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </div>
                <PricingTable highlightColor="#87059c">
                  {this.getPricingRows()}
                </PricingTable>
              </div>
            )}
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(PricingPage);
