import React from 'react'
import {Grid} from '@material-ui/core'
import youtube from './api/youtube'
import {SearchBar, VideoDetail, VideoList} from './components'

class App extends React.Component{
    state = {
        videos: [],
        selectedVideo: null,
    };

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', { params: {
            part: 'snippet',
            maxResults: 5,
            key: 'AIzaSyAFKZVEF6efMxZ7CkLjar5cgbigBuhwphc',
            q: searchTerm,
        }});

        this.setState({videos: response.data.items, selectedVideo: response.data.items[0]});
        
    }

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video});
    }
    
    render(){
        const {selectedVideo, videos} =  this.state;
        return(
            <Grid justfy= 'center'container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={10}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;