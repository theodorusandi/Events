import { useCallback, useState } from "react";
import { Event } from "../../../common/typings/EventTypes";
import EventFormComponent from "./EventFormComponent";
import { validateForm } from "../utils/validators";
import axios from "axios";

interface EventComponentProps {
  event: Event;
  onEdit: (event: Event) => Promise<void>;
  onDelete: (event: Event) => Promise<void>;
}

const EventComponent = ({ event, onEdit, onDelete }: EventComponentProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleOnEditSubmit = useCallback(
    async (editedEvent: Event, resetForm: () => void) => {
      try {
        const formErrors = validateForm(editedEvent);
        if (formErrors.length !== 0) {
          setErrors(formErrors);
          return;
        }
        await onEdit(editedEvent);
        setEditMode(false);
        setErrors([]);
        resetForm();
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setErrors([...errors, err.response.data.error]);
          return;
        }
        setErrors(["something went wrong"]);
        console.error(err);
      }
    },
    [errors, onEdit],
  );

  const handleOnEditButtonClick = useCallback(async () => {
    setEditMode((prevEditMode) => !prevEditMode);
  }, []);

  const handleOnDeleteButtonClick = useCallback(async () => {
    try {
      await onDelete(event);
      setEditMode(false);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrors([...errors, err.response.data.error]);
        return;
      }
      setErrors(["something went wrong"]);
      console.error(err);
    }
  }, [errors, event, onDelete]);

  return (
    <div className="d-flex flex-column gap-2">
      <div className="card p-2">
        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            {errors.join(", ")}
          </div>
        )}
        <div className="card-body">
          {editMode ? (
            <EventFormComponent
              formData={event}
              onSubmit={handleOnEditSubmit}
              actionButtonText="Save"
            />
          ) : (
            <>
              <h5 className="card-title">{event.title}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {event.location} / {event.date}
              </h6>
              <p className="card-text">{event.description}</p>
            </>
          )}
        </div>
        <div className="d-flex gap-2 align-self-end">
          <button
            onClick={handleOnEditButtonClick}
            type="button"
            className="btn btn-secondary"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={handleOnDeleteButtonClick}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
