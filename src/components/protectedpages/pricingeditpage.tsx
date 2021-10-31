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
import SnackActions from "../../alert/alert";

export default function PricingEditor() {
  const defPrices: PricingData[] = [];
  const [prices, setPrices] = useState(defPrices);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [delCallback, setDelCallback] = useState(() => (b: boolean) => {});

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
        return { ...params.row };
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
        return { ...params.row };
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
        return { ...params.row };
      },
    },
    {
      field: "booking",
      headerName: "Book Now?",
      flex: 1.0,
      editable: true,
      type: "boolean",
      valueGetter: (params: any) => {
        const val = params.row.booking;
        if (typeof val === "string") return params.row.booking === "1";
        else return params.row.booking;
      },
      valueSetter: (params: any) => {
        const txt = params.value;
        if (txt) {
          params.row.booking = "1";
        } else {
          params.row.booking = "0";
        }
        return { ...params.row, booking: params.row.booking };
      },
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
              setDelCallback(() => (confirmed: boolean) => {
                setDialogOpen(false);
                if (confirmed) {
                  const row = apiRef.current.getRow(obj.id);
                  backend.deletePricing(row).then((data) => {
                    SnackActions.success("Deleted " + row.title);
                  });
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
    try {
      backend.getPricing().then((data) => {
        data.forEach((d: any) => {
          d.options = JSON.parse(d.options);
          d.booking = d.booking === "1" ? true : false;
        });
        setPrices(data);
        setLoaded(true);
      });
    } catch {
      setLoadError(true);
      SnackActions.error("Couldn't load data. Please refresh the page.");
    }
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

      backend.addPricing(apiRef.current.getRow(id));

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

  function rowSaveAction(params: GridRowParams) {
    const cur = apiRef.current;
    cur.commitRowChange(params.id);
    cur.setRowMode(params.id, "view");
    const row = cur.getRow(params.id);
    backend.updatePrice(row).then((resp) => {
      if (resp.ok) {
        SnackActions.success("Saved " + row.title);
      } else {
        SnackActions.error(
          "Unable to update. Error code:" +
            resp.status +
            ". Please reload the page."
        );
      }
    });
  }

  function handleSaveClick(id: number) {
    const cur = apiRef.current;
    if (cur) rowSaveAction(cur.getRow(id));
  }

  return (
    <div className="page-content">
      <div className="page-header">Pricing Editor</div>
      <div style={{ height: "400px" }}>
        <DataGrid
          rows={prices}
          columns={columns}
          error={loadError ? true : undefined}
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
          callback={delCallback}
          description={
            "You are about to permanently delete this pricing option. Are you sure?"
          }
        />
      </div>
    </div>
  );
}
