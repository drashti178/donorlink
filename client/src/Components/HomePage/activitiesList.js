import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function ActivitiesList({items}) {
    const ImgPath = "/images/activity/";
  return (
    <ImageList sx={{ width: "100%", height: "95%" }}>
      {items.map((item) => (
        <ImageListItem key={item.a_id}>
          <img
            src={`${ImgPath + item.activityImgName}?w=240&fit=crop&auto=format`}
            
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.activityname}
            subtitle={<span>Participation: {item.participation}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

