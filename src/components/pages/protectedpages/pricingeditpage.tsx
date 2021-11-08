import { useEffect, useMemo, useRef, useState } from "react";

// External Utilities
import { Link } from "react-router-dom";

// MUI Library
import {
  DataGrid,
  GridActionsCellItem,
  GridApiRef,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridRowParams,
  GridToolbarContainer,
  GridValueGetterParams,
  GridValueSetterParams,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internal Utilities
import backend from "../../../backend/backend";
import { PricingData } from "../../../backend/backendinterface";
import SnackActions from "../../../alert/alert";
import { useConfirmDialog } from "../../useConfirmDialog";

/**
 * Component to render the UI to edit pricing options
 *
 * TODO -- separate logic into a PricingModel?
 *      -- Think: loosely couple x-grid library
 *
 * @returns component to render
 */
export default function PricingEditor() {
  // Price list, and associated fetch error fields
  const [prices, setPrices] = useState([] as PricingData[]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // variables (flags/state) for the delete confirm dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [delObj, setDelObj] = useState({} as GridRowParams);

  /**
   * After mount, load the prices from the backend
   */
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

  /**
   * Hook to store the current GridAPI ref
   *
   * @returns ref
   */
  function useApiRef() {
    const apiRef: React.MutableRefObject<GridApiRef | null> = useRef(null);
    useMemo(
      () =>
        columns.push({
          field: "__HIDDEN__",
          headerName: "__HIDDEN__",
          editable: false,
          width: 0,
          minWidth: 0,
          renderCell: (params: GridRenderCellParams) => {
            apiRef.current = params.api;
            return null;
          },
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [columns]
    );

    return apiRef;
  }

  /**
   * Properties and formatting for the CRUD editor's columns
   */
  const columns: GridColumns = [
    { field: "title", headerName: "Title", flex: 1.0, editable: true },
    { field: "price", headerName: "Price", flex: 1.0, editable: true },
    {
      field: "num_images",
      headerName: "Digital Imgs",
      flex: 1.0,
      editable: true,
      // since num_images is part of the options object, we need
      // a custom getter/setter
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.options && params.row.options.num_images) {
          return params.row.options.num_images;
        } else {
          return "";
        }
      },
      valueSetter: (params: GridValueSetterParams) => {
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
      // since print_rel is part of the options object, we need
      // a custom getter/setter
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.options && params.row.options.print_rel) {
          return params.row.options.print_rel;
        } else {
          return "";
        }
      },
      valueSetter: (params: GridValueSetterParams) => {
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
      // since custom_txt is part of the options object, we need
      // a custom getter/setter
      valueGetter: (params: GridValueGetterParams) => {
        if (params.row.options && params.row.options.custom_txt) {
          return params.row.options.custom_txt;
        } else {
          return "";
        }
      },
      valueSetter: (params: GridValueSetterParams) => {
        const txt = params.value;
        // based on current state, we do slightly different operations
        // to set a new value
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
      // to render booking properly (typing from server problem), we need
      // a custom getter/setter
      valueGetter: (params: GridValueGetterParams) => {
        const val = params.row.booking;
        if (typeof val === "string") return params.row.booking === "1";
        else return params.row.booking;
      },
      valueSetter: (params: GridValueSetterParams) => {
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

      // Get the edit actions column component
      getActions: (obj: GridRowParams) => {
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
              setDelObj(obj);
              setDialogOpen(true);
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const apiRef: any = useApiRef(); // must be after columns is defined

  /**
   * Custom effect of using a confirmation dialog to
   * perform an action; in this case, delete a pricing option
   *
   * @param dialogOpen Dependancy to toggle the delete dialog
   */
  const DelDialog = useConfirmDialog(
    {
      title: "Confirm delete?",
      description:
        "You are about to permanently delete this pricing option. Are you sure?",
      isOpen: dialogOpen,
      confirmAction: () => {
        const row = apiRef.current.getRow(delObj.id);
        backend.deletePricing(row).then((data) => {
          SnackActions.success("Deleted " + row.title);
        });
        apiRef.current.updateRows([{ id: delObj.id, _action: "delete" }]);

        setDialogOpen(false);
      },
      cancelAction: () => {
        setDialogOpen(false);
      },
    },
    [dialogOpen]
  );

  /**
   * Function called when the save icon button is clicked in a row
   * @param id ID of the row to save
   */
  function handleSaveClick(id: GridRowId) {
    const cur = apiRef.current;
    if (cur) rowSaveAction(cur.getRow(id));
  }

  /**
   * Functional component for the edit toolbar
   *
   * @param props Props for the component
   * @returns Element to render
   */
  function EditToolbar(props: any): JSX.Element {
    const { apiRef } = props;

    /**
     * Function called when "Add Record" is clicked on the toolbar
     */
    const handleAddClick = () => {
      const id = Math.floor(Math.random() * 100000);
      // update local/frontend
      apiRef.current.updateRows([{ id, isNew: true }]);
      apiRef.current.setRowMode(id, "edit");

      // update server/backend
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
          onClick={handleAddClick}
        >
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  /**
   * Function called when a row is saved (save btn or click icon)
   * @param params
   */
  function rowSaveAction(params: GridRowParams) {
    // change in the UI / local
    const cur = apiRef.current;
    cur.commitRowChange(params.id);
    cur.setRowMode(params.id, "view");

    // update the backend
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

  /**
   * Return the component for rendering
   */
  return (
    <div className="page-content">
      <div className="page-header">
        Pricing Editor{" "}
        <IconButton
          style={{ verticalAlign: "baseline" }}
          component={Link}
          to="/pricing"
        >
          <VisibilityIcon />
        </IconButton>
      </div>
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
        {DelDialog}
      </div>
    </div>
  );
}
