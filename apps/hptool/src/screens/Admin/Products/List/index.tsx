import Flex from "src/components/common/Flex";
import DataTable from "src/components/common/Table";
import useSelector from "src/hooks/useSelector";
import moment from "moment";
import Text from "src/components/common/Text";
import { useGlobalStyle } from "src/styles";
import useLocalize from "src/hooks/useLocalize";
import { useEffect, useState } from "react";
import {
  searchProducts,
  deleteProduct,
  deleteProducts,
  updateProductData,
} from "src/actions/product.actions";
import SelectField from "src/components/common/SelectField";
import { searchBranchs } from "src/actions/branch.actions";
import { searchCategories } from "src/actions/category.actions";
import { Button, TextField } from "@material-ui/core";
import InputField from "src/components/common/InputField";
import { replaceProductContent } from "src/apis/product";
import { NotiStackInstance } from "pages/_app";
import { isArray } from "lodash";

const ListProductsPage = (props) => {
  const { filter, products, loading, paging, selectedIds } = useSelector(
    (state) => state.products
  );
  const { t } = useLocalize();
  const globalClasses = useGlobalStyle();
  const [field, setField] = useState("");
  const [originText, setOriginText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [replacing, setReplacing] = useState(false);

  const handleClickDetail = (router, row) => {
    window.location.replace(
      `${window.location.origin}/admin/products?sMenu=detail-product&id=${row._id}`
    );
  };

  const handleClickDelete = (row: any) => {
    isArray(row) ? deleteProducts(row) : deleteProduct(row._id);
  };

  const handleChangeBranch = ({ value, name }) => {
    updateProductData({
      name: "filter",
      value: {
        ...filter,
        branch: (value || "").toUpperCase(),
      },
    });
  };

  const handleChangeCategory = ({ value, name }) => {
    updateProductData({
      name: "filter",
      value: {
        ...filter,
        categories: value,
      },
    });
  };

  const handleChangeOriginal = (e: any) => {
    updateProductData({
      name: "filter",
      value: {
        ...filter,
        original: e.target.value,
      },
    });
  };

  useEffect(() => {
    searchProducts();
  }, [filter]);

  const handleChangeField = (data) => {
    setField(data.value);
  };

  const handleChangeOriginText = (data) => {
    setOriginText(data.value);
  };

  const handleChangeReplaceText = (data) => {
    setReplaceText(data.value);
  };

  const handleReplace = async () => {
    setReplacing(true);
    try {
      await replaceProductContent({
        field,
        originText,
        replaceText,
      });
      NotiStackInstance.push({
        variant: "success",
        children: "Replaced all data success!",
      });
    } catch (error) {
      NotiStackInstance.push({
        variant: "error",
        children: "Replaced all data failed!",
      });
    }
    setReplacing(false);
  };

  return (
    <Flex width={"100%"} height={"100%"} column>
      <Flex width={"100%"} center my={4}>
        <Text className={globalClasses.textTitle}>{t(`LIST PRODUCTS`)}</Text>
      </Flex>
      <Flex width={"100%"} my={4} flexWrap={"wrap"}>
        <Flex width={320} column>
          <Text className={globalClasses.labelText}>Branch:</Text>
          <SelectField
            item={{
              placeholder: "Select branch",
              getOptions: searchBranchs,
              onChange: handleChangeBranch,
              useNoneValue: true,
            }}
          />
        </Flex>
        <Flex width={320} ml={2} column>
          <Text className={globalClasses.labelText}>Category:</Text>
          <SelectField
            item={{
              placeholder: "Select category",
              getOptions: searchCategories,
              onChange: handleChangeCategory,
              useNoneValue: true,
            }}
          />
        </Flex>
        <Flex width={320} ml={2} column>
          <Text className={globalClasses.labelText}>Original:</Text>
          <Flex
            border={"solid 1px rgba(0,0,0, 0.25)"}
            px={1}
            borderRadius={".5rem"}
          >
            <TextField
              variant="standard"
              fullWidth
              onChange={handleChangeOriginal}
              onBlur={() => searchProducts()}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex width={"100%"} mb={4} flexWrap={"wrap"}>
        <Flex center my={1}>
          <Button
            variant="contained"
            disabled={!selectedIds || (selectedIds && selectedIds.length < 1)}
            onClick={() => {
              handleClickDelete(selectedIds);
              setTimeout(() => {
                updateProductData({
                  name: "selectedIds",
                  value: [],
                });
              }, 800);
            }}
          >
            Delete
          </Button>
        </Flex>
      </Flex>

      <DataTable
        rows={products || []}
        loading={loading}
        onClickDetail={handleClickDetail}
        onClickDelete={handleClickDelete}
        selectedIds={selectedIds}
        paging={paging}
        searchData={searchProducts}
        updatePaging={(pageData = {}) =>
          updateProductData({
            name: "paging",
            value: {
              ...(paging || {}),
              ...pageData,
            },
          })
        }
        updateSelected={(ids = []) =>
          updateProductData({
            name: "selectedIds",
            value: ids,
          })
        }
        columns={[
          {
            field: "name",
            headerName: "Name",
            width: 250,
            editable: false,
          },
          {
            field: "branch",
            headerName: "Branch",
            width: 100,
            editable: false,
          },
          {
            field: "sku",
            headerName: "SKU",
            width: 100,
            editable: false,
          },
          {
            field: "model",
            headerName: "Model",
            width: 100,
            editable: false,
          },
          {
            field: "engine",
            headerName: "Engine",
            width: 100,
            editable: false,
          },
          {
            field: "original",
            headerName: "Original",
            width: 100,
            editable: false,
          },
          {
            field: "warranty_time",
            headerName: "Warranty",
            width: 100,
            editable: false,
          },
          {
            field: "quantity",
            headerName: "Quantity",
            width: 80,
            editable: false,
          },
          {
            field: "sold",
            headerName: "Sold",
            width: 80,
            editable: false,
          },
          {
            field: "remain",
            headerName: "Remain",
            width: 80,
            editable: false,
          },
          {
            field: "price",
            headerName: "Price",
            width: 180,
            editable: false,
          },
          {
            field: "rating",
            headerName: "Rating",
            width: 100,
            editable: false,
          },
          {
            field: "created_at",
            headerName: "Created at",
            width: 200,
            editable: false,
            render: (row) =>
              row.created_at
                ? moment(row.created_at, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
                    "DD/MM/YYYY HH:mm:ss"
                  )
                : "",
          },
          {
            field: "updated_at",
            headerName: "Updated at",
            width: 200,
            editable: false,
            render: (row) =>
              row.updated_at
                ? moment(row.updated_at, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
                    "DD/MM/YYYY HH:mm:ss"
                  )
                : "",
          },
        ]}
      />

      <Flex width={"100%"} mb={4} flexWrap={"wrap"}>
        <Flex center my={1}>
          <Button
            variant="contained"
            disabled={!selectedIds || (selectedIds && selectedIds.length < 1)}
            onClick={() => {
              handleClickDelete(selectedIds);
              setTimeout(() => {
                updateProductData({
                  name: "selectedIds",
                  value: [],
                });
              }, 800);
            }}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ListProductsPage;
