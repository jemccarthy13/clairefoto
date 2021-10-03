import React from "react";

export default class PricingPage extends React.PureComponent {
  render() {
    return (
      <div className="page-content">
        <div className="page-header">Pricing</div>
        <div>30 minute</div>
        <div>45 minute</div>
        <div>Seasonal</div>
        <div>Special Events</div>
      </div>
    );
  }
}
