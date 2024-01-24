import useSWR from "swr";
import ListOfMembers from "../components/ListOfMembers";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Members = () => {
  const { data: members, mutate: mutateMembers } = useSWR(
    "http://127.0.0.1:8000/server/members/",
    fetcher
  );

  return (
    <div>
      <ListOfMembers members={members} mutateMembers={mutateMembers} />
    </div>
  );
};

export default Members;
