import "./List.css";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../functions";
import ModalMember from "./ModalMember";
import ModalBorrow from "./ModalBorrow";

const ListOfMembers = ({ members, mutateMembers }) => {
  const [selectedMember, setSelectedMember] = useState({ id: "", mode: "" });

  const { data: detail, mutate: mutateMember } = useSWR(
    selectedMember.id
      ? `http://127.0.0.1:8000/server/member/${selectedMember.id}`
      : null,
    fetcher
  );

  return (
    <>
      <div className="list">
        <div>
          <h2>Members</h2>
          {members &&
            members.map((member) => (
              <div className="card">
                <div key={member.id}>
                  <p>{`${member.first_name} ${member.last_name}`}</p>
                </div>
                <div>
                  <span
                    onClick={() =>
                      setSelectedMember({ id: member.id, mode: "edit" })
                    }
                  >
                    Edit
                  </span>
                  <span
                    onClick={() =>
                      setSelectedMember({ id: member.id, mode: "borrow" })
                    }
                  >
                    Books
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className="button-wrapper">
          <button onClick={() => setSelectedMember({ id: "", mode: "add" })}>
            Add Member
          </button>
        </div>
      </div>
      {selectedMember.mode === "add" && (
        <ModalMember
          detail={detail}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          mutateMember={mutateMember}
          mutateMembers={mutateMembers}
        />
      )}
      {selectedMember.mode === "edit" && detail && (
        <ModalMember
          detail={detail}
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          mutateMember={mutateMember}
          mutateMembers={mutateMembers}
        />
      )}
      {selectedMember.mode === "borrow" && detail && (
        <ModalBorrow
          detail={detail}
          setSelectedMember={setSelectedMember}
          mutateMember={mutateMember}
        />
      )}
    </>
  );
};

export default ListOfMembers;
