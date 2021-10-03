import { Link } from "@mui/material";
import React from "react";

import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";
import { RouteComponentProps, withRouter } from "react-router-dom";

class PricingPage extends React.PureComponent<RouteComponentProps> {
  slotClick = () => {
    this.props.history.push("/booking");
  };

  render() {
    return (
      <div className="page-content">
        <div className="page-header">Pricing</div>
        <PricingTable highlightColor="#87059c">
          <PricingSlot
            onClick={this.slotClick}
            title="30-minute"
            priceText="$75"
            buttonText="Book Now"
          >
            <PricingDetail>
              <b>20+</b> digital images
            </PricingDetail>
            <PricingDetail>
              <b>Full</b> print release
            </PricingDetail>
          </PricingSlot>
          <PricingSlot
            title="45-minute"
            priceText="$95"
            buttonText="Book Now"
            onClick={this.slotClick}
          >
            <PricingDetail>
              <b>35+</b> digital images
            </PricingDetail>
            <PricingDetail>
              <b>Full</b> print release
            </PricingDetail>
          </PricingSlot>
          <PricingSlot
            title="Seasonal"
            priceText="TBD"
            buttonText="Book Now"
            onClick={this.slotClick}
          >
            <PricingDetail>
              Details will be published on
              <Link href="https://www.facebook.com/clairemariefotografie">
                Facebook
              </Link>
            </PricingDetail>
          </PricingSlot>
          <PricingSlot
            title="Packages"
            priceText="Contact Me"
            buttonText="Book Now"
            onClick={this.slotClick}
          >
            <PricingDetail>Birthdays</PricingDetail>
            <PricingDetail>Weddings</PricingDetail>
            <PricingDetail>Special Events</PricingDetail>
          </PricingSlot>
        </PricingTable>
      </div>
    );
  }
}

export default withRouter(PricingPage);
