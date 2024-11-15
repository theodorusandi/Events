import { useCallback, useState } from "react";
import EventFormComponent from "./EventFormComponent";
import { Event } from "../../../common/typings/EventTypes";

import { Request } from "../api/Request";
import axios from "axios";
import { validateForm } from "../utils/validators";

interface AddEventFormProps {
  fetchEvents: () => Promise<void>;
}

const AddEventForm = ({ fetchEvents }: AddEventFormProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleOnSubmit = useCallback(
    async (formData: Event, resetForm: () => void) => {
      try {
        setErrors([]);
        const formErrors = validateForm(formData);
        if (formErrors.length !== 0) {
          setErrors(formErrors);
          return;
        }
        await Request.post<Event>(
          `${import.meta.env.VITE_BASE_URL}/events/create`,
          formData,
        );
        await fetchEvents();
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
    [errors, fetchEvents],
  );

  return (
    <>
      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors.join(", ")}
        </div>
      )}
      <EventFormComponent onSubmit={handleOnSubmit} actionButtonText="Add" />
    </>
  );
};

export default AddEventForm;
