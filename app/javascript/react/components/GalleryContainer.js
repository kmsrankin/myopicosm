
import React, { Component } from 'react';
import FileUploadContainer from './FileUploadContainer'
class GalleryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images
    }
    this.renderNewImage = this.renderNewImage.bind(this)
  }

  renderNewImage(image){
    this.setState( { images: this.state.images.concat(image) } )
  }

  render(){
    let images = this.state.images.map((image) => {
      return(
        <img src={image.event_photo.url} key={image.id}/>
      )
    })

    return (
      <div>
        <h1 className="story-header">Event Gallery</h1>
        <FileUploadContainer
          eventID={this.props.eventID}
          addNewImage={this.renderNewImage}
        />
        <div id="gallery">
          {images}
        </div>
      </div>
    )
  }
}

export default GalleryContainer
