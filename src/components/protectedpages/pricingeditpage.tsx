import { useEffect, useMemo, useRef, useState } from "react";
import backend from "../../backend/backend";
import { PricingData } from "../../backend/backendinterface";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";

export default function PricingEditor() {
  const defPrices: PricingData[] = [];
  const [prices, setPrices] = useState(defPrices);

  const columns: any[] = [
    { field: "title", headerName: "Title", flex: 1.0, editable: true },
    { field: "price", headerName: "Price", flex: 1.0, editable: true },
    {
      field: "num_images",
      headerName: "Digital Imgs",
      flex: 1.0,
      editable: true,
      valueGetter: (params: any) => {
        if (params.row.options.num_images) {
          return params.row.options.num_images;
        } else {
          return "";
        }
      },
      valueSetter: (params: any) => {
        const numImgs = params.value!.toString();
        params.row.options.num_images = numImgs;
        return { ...params.row, numImgs };
      },
    },
    // other options
    { field: "booking", headerName: "Book Now?", flex: 1.0, editable: true },
    // options: {
    //   num_images: string;
    //   print_rel: string;
    //   custom_txt: string[];
    // };
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1.0,

      getActions: (obj: any) => {
        const apiCur = apiRef.current;
        let isInEditMode = false;

        if (apiCur) {
          isInEditMode = apiCur.getRowMode(obj.id) === "edit";
        }

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={() => console.log("save")} //handleSaveClick(obj.id)}
              color="primary"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              console.log("delete");
            }} //handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const apiRef: any = useApiRef();

  useEffect(() => {
    const prices = backend.getPrices();
    setPrices(prices);
  }, []);

  function useApiRef() {
    const apiRef = useRef(null);
    const _columns = useMemo(
      () =>
        columns.push({
          field: "__HIDDEN__",
          headerName: "__HIDDEN__",
          editable: false,
          width: 0,
          minWidth: 0,
          renderCell: (params: any) => {
            apiRef.current = params.api;
            return null;
          },
        }),
      [columns]
    );

    return apiRef;
  }

  return (
    <div className="page-content">
      <div className="page-header">Pricing Editor</div>
      <div style={{ height: "400px" }}>
        <DataGrid
          rows={prices}
          columns={columns}
          editMode="row"
          hideFooterSelectedRowCount
          rowsPerPageOptions={[]}
        />
      </div>
    </div>
  );
}
