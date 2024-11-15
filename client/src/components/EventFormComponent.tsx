import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Event, EventKeys } from "../../../common/typings/EventTypes";
import dayjs from "dayjs";

interface EventFormComponentProps {
  formData?: Event;
  onSubmit: (event: Event, resetForm: () => void) => Promise<void>;
  actionButtonText?: string;
}

const DATE_FORMAT = "YYYY-MM-DD";

const defaultFormData: Event = {
  [EventKeys.Title]: "",
  [EventKeys.Date]: dayjs().format(DATE_FORMAT),
  [EventKeys.Location]: "",
  [EventKeys.Description]: "",
};

const EventFormComponent = ({
  formData,
  onSubmit,
  actionButtonText,
}: EventFormComponentProps) => {
  const [formDataState, setFormDataState] = useState<Event>(
    formData ?? defaultFormData,
  );

  const handleOnChange = useCallback(
    (formKey: EventKeys) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormDataState((prevFormDataState) => ({
          ...prevFormDataState,
          [formKey]: e.target.value,
        }));
      },
    [],
  );

  const handleOnSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await onSubmit(formDataState, () =>
        setFormDataState(formData ?? defaultFormData),
      );
    },
    [formData, formDataState, onSubmit],
  );

  useEffect(() => {
    if (formData) {
      setFormDataState(formData);
    }
  }, [formData]);

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <label className="form-label">Title*</label>
        <input
          type="text"
          className="form-control"
          value={formDataState[EventKeys.Title]}
          onChange={handleOnChange(EventKeys.Title)}
        />
      </div>
      <div className="mb-3">
        <label>Date*</label>
        <input
          type="date"
          className="form-control"
          value={formDataState[EventKeys.Date]}
          onChange={handleOnChange(EventKeys.Date)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Location*</label>
        <input
          type="text"
          className="form-control"
          value={formDataState[EventKeys.Location]}
          onChange={handleOnChange(EventKeys.Location)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description*</label>
        <textarea
          className="form-control"
          rows={3}
          onChange={handleOnChange(EventKeys.Description)}
          value={formDataState[EventKeys.Description]}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        {actionButtonText ?? "Submit"}
      </button>
    </form>
  );
};
export default EventFormComponent;
