import { useOne, useShow } from "@pankod/refine-core";
import { Profile } from "components";
import { useParams } from "@pankod/refine-react-router-v6";

const AgentProfile = () => {

  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string
  })


  const myProfile = data?.data ?? []


  if (isLoading) <div>Loading</div>
  
  if (isError) <div>Error</div>
  
  console.log({profile: data})

  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}

    />
  )
}

export default AgentProfile
