import Form from "app/components/Form";
import useFormLogic from "app/hooks/useFormLogic";
import { edgeTypesMapping } from "app/utils/constants";
import { memo, useMemo } from "react";

const EdgeForm = (props: any) => {
  const {
    edgeType,
    nodes,
    edges,
    onUpdateJson,
    onEdgesChange,
    initialValues,
    isEdit,
  } = props;

  const mappingEdgeSubmitData = useMemo(() => {
    return edgeTypesMapping[edgeType].mappingSubmitData
      ? edgeTypesMapping[edgeType].mappingSubmitData
      : (values: any) => values;
  }, [edgeType]);

  const [edgeFormData, edgeFormEvents] = useFormLogic({
    formData: {
      nodes,
      edges,
    },
    initialData: initialValues,
    onUpdateFormData: (changes: Array<any>) => {
      onEdgesChange && onEdgesChange(changes);
    },
    onSubmit: async (newEdge: any, isEdit = false as Boolean) => {
      if (onUpdateJson) {
        const newEdges = (edges || []).filter(
          (n: any) => !(isEdit && n.id === newEdge.id)
        );
        onUpdateJson({
          nodes: nodes || [],
          edges: [...newEdges, newEdge],
        });
      }
    },
    mappingSubmitData: mappingEdgeSubmitData,
    mappingInitialValues: edgeTypesMapping[edgeType].mappingInitialValues,
    isEdit,
  });

  return (
    <Form
      title={edgeTypesMapping[edgeType].createTitle}
      values={edgeFormData.values}
      validate={edgeTypesMapping[edgeType].validate}
      model={edgeTypesMapping[edgeType].model}
      onSubmit={edgeFormEvents.handleSubmit}
      getOptions={edgeTypesMapping[edgeType].getOptions}
      errors={edgeFormData.errors}
      dataSelected={{
        nodes,
        edges,
        supportedNodeClassname: [
          {
            key: "heading",
            value: "heading",
            label: "heading",
          },
        ],
      }}
      onUpdateForm={edgeFormEvents.handleUpdateData}
      onRelatedUpdate={edgeFormEvents.handleUpdateRelatedFields}
      onErrorUpdate={edgeFormEvents.handleUpdateErrors}
    />
  );
};

export default memo(EdgeForm);
