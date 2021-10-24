import { useEffect, useMemo, useRef, useState } from "react";
import backend from "../../backend/backend";
import { PricingData } from "../../backend/backendinterface";

import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";

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
        if (params.row.options && params.row.options.num_images) {
          return params.row.options.num_images;
        } else {
          return "";
        }
      },
      valueSetter: (params: any) => {
        const numImgs = params.value!.toString();
        if (params.row.options) {
          params.row.options.num_images = numImgs;
        } else {
          params.row.options = {
            num_images: numImgs,
          };
        }
        return { ...params.row, numImgs };
      },
    },
    {
      field: "print_rel",
      headerName: "Print Release",
      flex: 1.0,
      editable: true,
      valueGetter: (params: any) => {
        if (params.row.options && params.row.options.print_rel) {
          return params.row.options.print_rel;
        } else {
          return "";
        }
      },
      valueSetter: (params: any) => {
        const printRel = params.value!.toString();
        if (params.row.options) {
          params.row.options.print_rel = printRel;
        } else {
          params.row.options = {
            print_rel: printRel,
          };
        }
        return { ...params.row, printRel };
      },
    },
    {
      field: "custom_txt",
      headerName: "Custom Text",
      flex: 2.0,
      editable: true,
      valueGetter: (params: any) => {
        if (params.row.options && params.row.options.custom_txt) {
          return params.row.options.custom_txt;
        } else {
          return "";
        }
      },
      valueSetter: (params: any) => {
        const txt = params.value!.toString();
        if (params.row.options) {
          params.row.options.custom_txt = txt;
        } else {
          params.row.options = {
            custom_txt: txt,
          };
        }
        return { ...params.row, txt };
      },
    },
    // other options
    // options: {
    //   custom_txt: string[];
    // };
    {
      field: "booking",
      headerName: "Book Now?",
      flex: 1.0,
      editable: true,
      type: "boolean",
    },

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

  function EditToolbar(props: any) {
    const { apiRef } = props;

    const handleClick = () => {
      const id = Math.floor(Math.random() * 100000);
      apiRef.current.updateRows([{ id, isNew: true }]);
      apiRef.current.setRowMode(id, "edit");
      // Wait for the grid to render with the new row
      setTimeout(() => {
        apiRef.current.scrollToIndexes({
          rowIndex: apiRef.current.getRowsCount() - 1,
        });

        apiRef.current.setCellFocus(id, "title");
      });
    };

    return (
      <GridToolbarContainer>
        <Button
          style={{
            width: "fit-content",
            height: "min-content",
            padding: "5px",
            backgroundColor: "white",
          }}
          size="small"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">Pricing Editor</div>
      <div style={{ height: "400px" }}>
        <DataGrid
          rows={prices}
          columns={columns}
          editMode="row"
          disableColumnFilter
          hideFooterSelectedRowCount
          rowsPerPageOptions={[]}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { apiRef },
          }}
        />
      </div>
    </div>
  );
}
