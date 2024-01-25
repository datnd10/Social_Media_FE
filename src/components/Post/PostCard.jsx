import { Card, CardHeader } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
const PostCard = ({post}) => {
  return (
    <Card className=''>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {post.user.firstName + " " + post.user.lastName}
        subheader= {"@" + post.user.firstName + " " + post.user.lastName}
      />
      <CardMedia
        component="img"
        height="200"
        image= {post.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between' disableSpacing>
        <div>
            <IconButton>
                {true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton>
               <ShareIcon />
            </IconButton>
            <IconButton>
               <ModeCommentIcon />
            </IconButton>
        </div>
        <div> 
            <IconButton>
                {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
        </div>
      </CardActions>
    </Card>
  )
}

export default PostCard