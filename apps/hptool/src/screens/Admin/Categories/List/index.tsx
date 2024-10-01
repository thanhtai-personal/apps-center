import Flex from "src/components/common/Flex";
import DataTable from "src/components/common/Table";
import useSelector from "src/hooks/useSelector";
import moment from "moment";
import Text from "src/components/common/Text";
import { useGlobalStyle } from "src/styles";
import { useEffect } from "react";
import { searchCategories, deleteCategory } from "src/actions/category.actions";
import useLocalize from "src/hooks/useLocalize";

const ListCategoriesPage = (props) => {
  const categoriesData = useSelector((state) => state.categories);
  const { t } = useLocalize();
  const globalClasses = useGlobalStyle();

  useEffect(() => {
    searchCategories({
      page: 0,
      rowsPerPage: 1000,
    });
  }, []);

  const handleClickDetail = (router, row) => {
    window.location.replace(
      `${window.location.origin}/admin/categories?sMenu=detail-category&id=${row.id}`
    );
  };

  const handleClickDelete = (row) => {
    deleteCategory(row.id);
  };

  return (
    <Flex width={"100%"} height={"100%"} column>
      <Flex width={"100%"} center my={4}>
        <Text className={globalClasses.textTitle}>{t(`LIST CATEGORIES`)}</Text>
      </Flex>
      <DataTable
        rows={categoriesData.categories || []}
        onClickDetail={handleClickDetail}
        onClickDelete={handleClickDelete}
        columns={[
          {
            field: "name",
            headerName: "Name",
            width: 250,
            editable: false,
          },
          {
            field: "created_at",
            headerName: "Created at",
            width: 200,
            editable: false,
            render: (row: any, value) =>
              row.created_at
                ? moment(row.created_at, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
                    "DD/MM/YYYY HH:mm:ss"
                  )
                : "-",
          },
          {
            field: "updated_at",
            headerName: "Updated at",
            width: 200,
            editable: false,
            render: (row: any, value) =>
              row.updated_at
                ? moment(row.updated_at, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
                    "DD/MM/YYYY HH:mm:ss"
                  )
                : "-",
          },
        ]}
      />
    </Flex>
  );
};

export default ListCategoriesPage;
