import { useGetIdentity, useOne } from "@pankod/refine-core";
import { Profile } from "components";

const MyProfile = () => {

  const { data: user } = useGetIdentity();
  
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.email
  })

  const myProfile = data?.data ?? []


  if (isLoading) <div>Loading</div>
  
  if (isError) <div>Error</div>
  
  

  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}

    />
  )
}

export default MyProfile
