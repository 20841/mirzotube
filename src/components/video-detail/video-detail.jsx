import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { ApiService } from "../../service/api.service"
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material"
import ReactPlayer from "react-player"
import { CheckCircle, FavoriteOutlined, MarkChatRead, Tag, Visibility } from "@mui/icons-material"
// import renderHTML from "react-render-html";
import { Loader, Videos } from '../'
 


const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null)
  const [relatedVideo, setRelatedVideo] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getData = async() => {
      try {
        const data = await ApiService.fetching(`videos?part=snippet,statistics&id=${id}`)
        setVideoDetail(data.items[0])
        const relateData = await ApiService.fetching(`search?part=snippet&relatedToVideoId=${id}&type=video`)
        console.log(relateData)
        setRelatedVideo(relateData.items)
    }catch (error) {
        console.log(error)
        } 
      }
      
    getData()

  }, [id])

  if (!videoDetail?.snippet) return <Loader />
  console.log(videoDetail)

  // const {
  //   snippet: { title, channelId, channelTitle, description, tags, thumnails },
  //   statistics: { viewCount, likeCount, commentCount} 
  // } = videoDetail


  return (
    <Box minHeight={'90vh'} mb={10}>
      <Box display={'flex'} sx={{flexDirection: {xs: 'column', md: 'row'}}}>
        <Box width={{xs: '100%', md: '75%'}}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' 
           controls
          />
          {videoDetail.snippet.tags.map((item, idx) => (
            <Chip
            label={item}
            key={idx}
            sx={{marginTop: '10px', cursor: 'pointer', ml: '10px'}}
            deleteIcon={<Tag />}
            onDelete={() => {}}
            variant="outlined" />
          ))}
          <Typography variant="h5" fontWeight='bold' p={2}>
            {videoDetail.snippet.title}
            </Typography>
            <Typography variant="subtitle2" p={2} sx={{opacity: '7'}}>
              
              {(videoDetail.snippet.description)}
            </Typography>

       
       <Stack direction='row' gap='20px' alignItems='center' py={1} px={2} >
       <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px' >
            <Visibility />
             {parseInt(videoDetail.statistics.viewCount).toLocaleString()} views
         </Stack>
         <Stack  sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px' >
             <FavoriteOutlined />
             {parseInt(videoDetail.statistics.likeCount).toLocaleString()} likes
         </Stack>
         <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px' >
                <MarkChatRead />
                 {parseInt(videoDetail.statistics.commentCount).toLocaleString()} comment
         </Stack>
          </Stack>
          
          <Stack direction='row' py={1} px={2}>
          <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
             <Stack direction='row' alignItems='center' gap='5px' marginTop='5px'>
              <Avatar
              alt={videoDetail.snippet.channelTitle}
              src={videoDetail.snippet.thumbnails.default.url} 
              />
              <Typography variant="subtitle2" color='gray'>
                {videoDetail.snippet.channelTitle}
                <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}} />
              </Typography>
             </Stack>
             </Link>
          </Stack>
        </Box>
        <Box width={{xs: '100%', md: '25%'}}
         px={2}
         py={{ md: 1, xs: 5}}
         justifyContent= 'center'
         alignItems='center'
         overflow={'scroll'}
         maxHeight={'120vh'}
        >
          <Videos videos={relatedVideo && relatedVideo} />
        </Box>
      </Box>
    </Box>
  )
  
}

export default VideoDetail



// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ApiService } from "../../service/api.service";
// import { Box, Chip, Stack, Typography } from "@mui/material";
// import ReactPlayer from "react-player";
// import { FavoriteOutlined, MarkChatRead, Tag, Visibility } from "@mui/icons-material";
// import renderHTML from "react-render-html";

// const VideoDetail = () => {
//   const [videoDetail, setVideoDetail] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await ApiService.fetching(`videos?part=snippet,statistics&id=${id}`);
//         setVideoDetail(data.items[0]);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getData();
//   }, [id]);

//   if (!videoDetail) {
//     return <Typography>Loading...</Typography>;
//   }

//   const { snippet, statistics } = videoDetail;
//   const { title, channelId, channelTitle, description, tags } = snippet;
//   const { viewCount, likeCount, commentCount } = statistics;

//   return (
//     <Box minHeight="90vh" mb={10}>
//       <Box display="flex">
//         <Box width="75%">
//           <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
//           {tags && tags.map((item, idx) => (
//             <Chip
//               label={item}
//               key={idx}
//               sx={{ marginTop: '10px', cursor: 'pointer', ml: '10px' }}
//               deleteIcon={<Tag />}
//               onDelete={() => {}}
//               variant="outlined"
//             />
//           ))}
//           <Typography variant="h5" fontWeight="bold" p={2}>
//             {title}
//           </Typography>
//           <Typography variant="subtitle2" p={2} sx={{ opacity: 0.7 }}>
//             {renderHTML(videoDetail.snippet.description)}
//           </Typography>
// {/* 
//       <Stack direction='row' gap='20px' alignItems='center' py={1} px={2} >
//         <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px' >
//             <Visibility />
//             {parseInt(videoDetail.statistics.viewCount).toLocaleString()} views
//         </Stack>
//         <Stack  sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px' >
//             <FavoriteOutlined />
//             {parseInt(videoDetail.statistics.likeCount).toLocaleString()} likes
//         </Stack>
//         <Stack sx={{ opacity: 0.7 }} direction='row' alignItems='center' gap='3px' >
//                 <MarkChatRead />
//                 {parseInt(videoDetail.statistics.commentCount).toLocaleString()} comment
//         </Stack>
       

//           </Stack> */}
//         </Box>
//         <Box width="25%">Suggested video</Box>
//       </Box>
//     </Box>
//   );
// };

// export default VideoDetail;

