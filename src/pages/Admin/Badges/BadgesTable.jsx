import { useState } from "react";
import { suAxiosInstance } from "../../../utils/axios-utils";
import {
  Card,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";


const TABLE_HEAD = ["Icon", "Name", "description", ""];

export function BadgesTable() {

  const [badges, setBadges] = useState([])
  
  suAxiosInstance.get('/badges/').then((res)=>{
    setBadges(res.data)
  }).catch((err)=>console.log(err))

  return (
    <Card className="w-full h-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {badges.map(({ icon, name, description }, index) => {
            const isLast = index === badges.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={name}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={icon ? icon : defaultUserImageLink}
                      alt={name}
                      size="md"
                      className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                    />
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {name}
                    </Typography>
                  </div>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {description}
                  </Typography>
                </td>
                <td className={classes}>
                  <Tooltip content="Edit User">
                    <IconButton variant="text" color="blue-gray">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}