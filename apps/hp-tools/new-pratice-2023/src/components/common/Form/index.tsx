import { useMemo } from "react";
import { sortBy } from "lodash";
import FormPresentation from "./presentation";

export const FormItemTypes = {
  FIELD: "FIELD",
  ACTION: "ACTION",
};

export const FieldAlignment = {
  TOP_LEFT: "TOP_LEFT",
  TOP_RIGHT: "TOP_RIGHT",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
  TOP: "TOP",
  BOTTOM: "BOTTOM",
};

interface FormProps {
  model: any;
  onSubmit?: any;
  children?: any;
}

const MuiForm = (props: FormProps) => {
  const { model = {}, children } = props;
  const modelMapping = useMemo(
    () =>
      Object.keys(model).map((key) => ({
        ...model[key],
        key,
      })),
    [model]
  );

  const { fields, actions } = useMemo(() => {
    const _fields = [];
    const _actions = [];
    modelMapping.forEach((formItem) => {
      switch (formItem.type) {
        case FormItemTypes.FIELD:
          _fields.push(formItem);
          break;
        case FormItemTypes.ACTION:
          _actions.push(formItem);
          break;
        default:
          break;
      }
    });
    return {
      fields: _fields,
      actions: _actions,
    };
  }, [modelMapping]);

  const { topLeftFields, topRightFields, bottomLeftFields, bottomRightFields } =
    useMemo(() => {
      const _topLeftFields = [],
        _topRightFields = [],
        _bottomLeftFields = [],
        _bottomRightFields = [];

      fields.forEach((field) => {
        switch (field.alignment) {
          case FieldAlignment.TOP_LEFT:
            _topLeftFields.push(field);
            break;
          case FieldAlignment.TOP_RIGHT:
            _topRightFields.push(field);
            break;
          case FieldAlignment.BOTTOM_LEFT:
            _bottomLeftFields.push(field);
            break;
          case FieldAlignment.BOTTOM_RIGHT:
            _bottomRightFields.push(field);
            break;
          default:
            _topLeftFields.push(field);
            break;
        }
      });
      return {
        topLeftFields: sortBy(_topLeftFields, (o) => o.priority),
        topRightFields: sortBy(_topRightFields, (o) => o.priority),
        bottomLeftFields: sortBy(_bottomLeftFields, (o) => o.priority),
        bottomRightFields: sortBy(_bottomRightFields, (o) => o.priority),
      };
    }, [fields]);

  const { topActions, bottomActions } = useMemo(() => {
    const _topActions = [],
      _bottomActions = [];

    actions.forEach((field) => {
      switch (field.alignment) {
        case FieldAlignment.TOP:
          _topActions.push(field);
          break;
        case FieldAlignment.BOTTOM:
          _bottomActions.push(field);
          break;
        default:
          _bottomActions.push(field);
          break;
      }
    });
    return {
      topActions: sortBy(_topActions, (o) => o.priority),
      bottomActions: sortBy(_bottomActions, (o) => o.priority),
    };
  }, [actions]);

  return (
    <FormPresentation
      topLeftFields={topLeftFields}
      topRightFields={topRightFields}
      bottomLeftFields={bottomLeftFields}
      bottomRightFields={bottomRightFields}
      topActions={topActions}
      bottomActions={bottomActions}
    >
      {children && children}
    </FormPresentation>
  );
};

export default MuiForm;
