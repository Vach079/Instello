import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

function Media(props) {
  const { loading = false } = props;
  return (
    <Card sx={{ width:"100%", m: 0 ,bgcolor: '#1e293b',p:2,borderRadius: 3,}} >
      <CardHeader
      sx={{width:"85%"}}
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circular" width={60} height={50} sx={{bgcolor: '#3E4859FF'}} />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={35}
              width="50%"
              sx={{bgcolor: '#3E4859FF'}}
              style={{ marginBottom: 10 }}
            />
          ) : (
            'Ted'
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={28} width="30%" sx={{bgcolor: '#3E4859FF'}} />
          ) : (
            '6 hours ago'
          )
        }
      />
      {loading ? (
        <Skeleton sx={{  height: 220,bgcolor: '#3E4859FF',borderRadius: '10px'}} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={35} style={{ marginBottom: 6 }}  sx={{bgcolor: '#3E4859FF'}}  />
            <Skeleton animation="wave" height={25} width="80%"  sx={{bgcolor: '#3E4859FF'}}  />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="text.secondary" component="p">
            {
              "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
            }
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function HideCard() {
  return (
    <div>
      <Media loading />
    </div>
  );
}

