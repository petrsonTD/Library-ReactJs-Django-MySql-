import { useForm } from "react-hook-form";
import "./List.css";

const ModalMember = ({
  detail,
  selectedMember,
  setSelectedMember,
  mutateMember,
  mutateMembers,
}) => {
  const form = useForm({
    defaultValues: {
      id: selectedMember.mode === "edit" ? detail.id : null,
      first_name: selectedMember.mode === "edit" ? detail.first_name : "",
      last_name: selectedMember.mode === "edit" ? detail.last_name : "",
      birth_date: selectedMember.mode === "edit" ? detail.birth_date : "",
      id_card: selectedMember.mode === "edit" ? detail.id_card : "",
    },
  });

  const deleteMember = () => {
    fetch(`http://127.0.0.1:8000/server/deleteMember/${detail.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Member has been deleted successfully");
        mutateMembers();
        setSelectedMember({ id: "", mode: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onSubmit = (data) => {
    fetch(
      `http://127.0.0.1:8000/server/${
        selectedMember.mode === "edit" ? "updateMember" : "createMember"
      }/`,
      {
        method: selectedMember.mode === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        mutateMember();
        mutateMembers();
        setSelectedMember({ id: "", mode: "" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div
        className="backdrop"
        onClick={() => setSelectedMember({ id: "", mode: "" })}
      ></div>
      <div className="modal">
        <div className="modal-header">
          <h2>
            {selectedMember.mode === "edit"
              ? `${detail.first_name} ${detail.last_name}`
              : "Adding new member"}
          </h2>
          <button
            className="close-button"
            onClick={() => setSelectedMember({ id: "", mode: "" })}
          >
            &times;
          </button>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="form">
            <div>
              <label>First name:</label>
              <input {...form.register("first_name")} />
            </div>
            <div>
              <label>Last name:</label>
              <input {...form.register("last_name")} />
            </div>
            <div>
              <label>Birth date:</label>
              <input type="date" {...form.register("birth_date")} />
            </div>
            <div>
              <label>ID card:</label>
              <input {...form.register("id_card")} />
            </div>
            <div className="button-wrapper">
              <div>
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setSelectedMember({ id: "", mode: "" })}
                >
                  Close
                </button>
                {selectedMember.mode === "edit" && (
                  <button
                    className={
                      !detail?.borrowed_books?.length ? "delete" : "disabled"
                    }
                    type="button"
                    onClick={deleteMember}
                    disabled={detail.borrowed_books?.length}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalMember;
