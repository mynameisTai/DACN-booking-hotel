import React, { memo, useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Alert,
  Checkbox,
} from "@material-tailwind/react";

import { CubeTransparentIcon } from "@heroicons/react/24/outline";

export function Sidebar(props) {
  const listCategory = props.listCategory;
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  let listArea = props.listArea;

  return (
    <Card className="h-auto max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/30 mt-10 w-2/6 bg-gray-50">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Lọc theo
        </Typography>
      </div>
      <List>
        {listArea.map((data) => {
          return (
            <ListItem key={data.id} className="font-semibold">
              <ListItemPrefix>
                <Checkbox value={data.title} onChange={props.onFilterByArea} />
              </ListItemPrefix>
              {data.title}
            </ListItem>
          );
        })}
      </List>
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Lọc theo
        </Typography>
      </div>
      <List>
        {listCategory?.map((data) => {
          return (
            <ListItem key={data._id} className="font-semibold">
              <ListItemPrefix>
                <Checkbox value={data._id} onChange={props.onFilterCategory} />
              </ListItemPrefix>
              {data.title}
            </ListItem>
          );
        })}
        <Alert
          open={openAlert}
          className="mt-auto"
          onClose={() => setOpenAlert(false)}
        >
          <CubeTransparentIcon className="mb-4 h-12 w-12" />
          <Typography variant="h6" className="mb-1">
            Upgrade to PRO
          </Typography>
          <Typography variant="small" className="font-normal opacity-80">
            Upgrade to Material Tailwind PRO and get even more components,
            plugins, advanced features and premium.
          </Typography>
          <div className="mt-4 flex gap-3">
            <Typography
              as="a"
              href="#"
              variant="small"
              className="font-medium opacity-80"
              onClick={() => setOpenAlert(false)}
            >
              Dismiss
            </Typography>
            <Typography as="a" href="#" variant="small" className="font-medium">
              Upgrade Now
            </Typography>
          </div>
        </Alert>
      </List>
    </Card>
  );
}
