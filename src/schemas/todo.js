import * as Yup from "yup";
import { PRIORITIES } from "../constants/priorities";

export function getTodoSchema({ isNew = false } = {}) {
  const deadlineRule = Yup.string()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Deadline must be in the format DD-MM-YYYY"
    );

  return Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long"),

    description: Yup.string().max(
      200,
      "Description must be at most 200 characters long"
    ),
    deadline: isNew
      ? deadlineRule.test(
          "is-future-date",
          "Deadline can't be date in the past",
          (value) => {
            const today = new Date().toISOString().split("T")[0];
            return value ? value >= today : true;
          }
        )
      : deadlineRule,
    priority: Yup.string()
      .required("Priority is not valid value")
      .oneOf(Object.keys(PRIORITIES), "Priority is not valid value"),
  });
}
