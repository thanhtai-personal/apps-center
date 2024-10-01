import Flex from "src/components/common/Flex";
import DataTable from "src/components/common/Table";
import useSelector from "src/hooks/useSelector";
import moment from "moment";

const ListRolesPage = (props) => {
  const rolesData = useSelector((state) => state.roles);

  return (
    <Flex width={"100%"} height={"100%"}>
      <DataTable
        rows={rolesData.roles || []}
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
          },
          {
            field: "updated_at",
            headerName: "Updated at",
            width: 200,
            editable: false,
          },
        ]}
      />
    </Flex>
  );
};

export default ListRolesPage;