import { useEffect, useState } from "react";
import backend from "../../backend/backend";
import { PricingData } from "../../backend/backendinterface";

import { PricingTable, PricingSlot, PricingDetail } from "react-pricing-table";

export default function PricingEditor() {
  const defPrices: PricingData[] = [];
  const [prices, setPrices] = useState(defPrices);

  useEffect(() => {
    const prices = backend.getPrices();
    setPrices(prices);
  }, []);

  const getPricingRows = () => {
    let tableRows: JSX.Element[] = [
      <div key={prices.length + Math.random() * 1000}>Loading...</div>,
    ];

    if (prices.length !== 0) {
      tableRows = prices.map((price: PricingData) => {
        return (
          <PricingSlot
            key={price.title + Math.random() * 1000}
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

  console.log("render price editor");
  return (
    <div className="page-content">
      <div className="page-header">Pricing Editor</div>
      <PricingTable highlightColor="#87059c">{getPricingRows()}</PricingTable>
    </div>
  );
}
