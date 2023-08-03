import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { userAxiosInstance } from "../../../utils/axios-utils";
import { apiUrl } from "../../../constants/constants";


export default function SkillSection({userId}) {

  const [userSkills, setUserSkills] = useState([])

  const callSetUserSkills = () => {
    userAxiosInstance.get('/user-profile/' + userId + '/').then((response) => {
      setUserSkills(response.data.skills)
    })
  }

  useEffect(() => {
    document.title = "Your Profile"
    callSetUserSkills()
  }, [])

  return (
    <>
      <Card className="max-w-6xl mx-auto border-2 border-gray-200 rounded-10 py-3">

        <div className='flex flex-row justify-between px-3 border-b'  >
          <Typography variant="h4" color="blue-gray" className="p-3" >
            Skills
          </Typography>
        </div>

        <List>
          {
            userSkills.map((skill) => {
              return (
                <ListItem key={skill.name} style={{ background: 'white' }}>
                  <ListItemPrefix>
                    <Avatar size="sm" variant="circular" alt="candice" src={apiUrl + skill.icon} />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {skill.name}
                    </Typography>
                  </div>
                </ListItem>
              )
            })
          }
          {userSkills.length < 1 ? <h1 className="py-2 px-2" >Not added any skills</h1> : ''}
        </List>
      </Card>
    </>
  );
}