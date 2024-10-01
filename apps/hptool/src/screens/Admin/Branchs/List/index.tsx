import Flex from "src/components/common/Flex";
import DataTable from "src/components/common/Table";
import useSelector from "src/hooks/useSelector";
import moment from "moment";
import Text from "src/components/common/Text";
import { useGlobalStyle } from "src/styles";
import { useEffect } from "react";
import { searchBranchs, deleteBranch } from "src/actions/branch.actions";
import useLocalize from "src/hooks/useLocalize";

const ListBranchsPage = (props) => {
  const branchsData = useSelector((state) => state.branchs);
  const { t } = useLocalize();
  const globalClasses = useGlobalStyle();

  useEffect(() => {
    searchBranchs({});
  }, []);

  const handleClickDetail = (router, row) => {
    window.location.replace(
      `${window.location.origin}/admin/branchs?sMenu=detail-branch&id=${row.id}`
    );
  };

  const handleClickDelete = (row) => {
    deleteBranch(row.id);
  };

  return (
    <Flex width={"100%"} height={"100%"} column>
      <Flex width={"100%"} center my={4}>
        <Text className={globalClasses.textTitle}>{t(`LIST BRANCHS`)}</Text>
      </Flex>
      <DataTable
        rows={branchsData.branchs || []}
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
            field: "logo",
            headerName: "Logo",
            width: 250,
            editable: false,
            render: (row: any, value) =>
              row.logoObj?.url ? (
                <Text color={"green"}>YES</Text>
              ) : (
                <Text color={"red"}>No</Text>
              ),
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

export default ListBranchsPage;
