import { useEffect, useMemo, useRef, useState } from "react";
import backend from "../../backend/backend";
import { PricingData } from "../../backend/backendinterface";

import {
  DataGrid,
  GridActionsCellItem,
  GridRowParams,
  GridToolbarContainer,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import ConfirmDialog from "../confirmdialog";

export default function PricingEditor() {
  const defPrices: PricingData[] = [];
  const [prices, setPrices] = useState(defPrices);
  const [loaded, setLoaded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [callback, setCallback] = useState(() => (b: boolean) => {});

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
        const txt = params.value;
        if (params.row.options) {
          if (typeof txt === "string") {
            params.row.options.custom_txt = txt.split(",");
          }
        } else {
          params.row.options = {
            custom_txt: txt,
          };
        }
        return { ...params.row, txt };
      },
    },
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
              onClick={() => handleSaveClick(obj.id)}
              color="primary"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {
              setCallback(() => (confirmed: boolean) => {
                setDialogOpen(false);
                if (confirmed) {
                  apiRef.current.updateRows([
                    { id: obj.id, _action: "delete" },
                  ]);
                }
              });
              setDialogOpen(true);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const apiRef: any = useApiRef();

  useEffect(() => {
    backend.getPricing().then((data) => {
      data[0].options = JSON.parse(data[0].options);
      setPrices(data);
      setLoaded(true);
    });
  }, []);

  function useApiRef() {
    const apiRef = useRef(null);
    useMemo(
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

  function rowSaveAction(params: Partial<GridRowParams>) {
    console.log("save prices to server");
    console.log(params.id);
  }

  function handleSaveClick(id: number) {
    const cur = apiRef.current;
    cur.setRowMode(id, "view");
    rowSaveAction({ id: id });
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
          loading={!loaded}
          hideFooterSelectedRowCount
          rowsPerPageOptions={[]}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: { apiRef },
          }}
          onRowEditStop={rowSaveAction}
        />
        <ConfirmDialog
          title={"Confirm delete?"}
          open={dialogOpen}
          callback={callback}
          description={
            "You are about to permanently delete this pricing option. Are you sure?"
          }
        />
      </div>
    </div>
  );
}
